-- =====================================================================
--  Aviso por e-mail a cada novo cadastro no site
--
--  O gatilho que já existe (on_auth_user_created) passa a, além de criar o
--  perfil pendente, disparar um e-mail para você.
--
--  POR QUE UM SERVIÇO DE E-MAIL E NÃO O PRÓPRIO SUPABASE:
--  o Supabase só envia e-mail para o PRÓPRIO usuário (confirmação, troca de
--  senha). Não existe "avisar o administrador" nativo.
--
--  Usamos o Resend: plano gratuito de 3.000 e-mails/mês, 100 por dia — muito
--  acima do volume de cadastros de uma loja.
--
--  ---------------------------------------------------------------------
--  ANTES DE RODAR ESTE ARQUIVO
--  ---------------------------------------------------------------------
--  1. Crie a conta em https://resend.com  (use o e-mail que vai RECEBER
--     os avisos — isso importa, veja o passo 3)
--  2. Em "API Keys", crie uma chave. Ela começa com  re_
--  3. Remetente:
--     - Sem domínio próprio: use 'onboarding@resend.dev'. O Resend só
--       entrega para o e-mail dono da conta — que é o seu caso.
--     - Com domínio verificado no Resend: use 'avisos@seudominio.com.br'
--       e aí dá para enviar para qualquer endereço.
--  4. Troque os três valores marcados com >>> TROCAR <<< abaixo.
--  5. Supabase → SQL Editor → cole tudo → Run.
-- =====================================================================

-- 1. Extensão que permite ao banco fazer chamadas HTTP.
create extension if not exists pg_net with schema extensions;

-- 2. Guarda a chave do Resend no Vault, e não solta no código da função.
--    Quem tiver acesso ao SQL Editor veria a chave em texto puro.
--
--    Cria se não existir, atualiza se já existir: o arquivo pode ser rodado
--    quantas vezes for preciso. No SQL Editor, uma instrução que falha aborta
--    todo o resto do script — então um erro de "nome duplicado" aqui impediria
--    a criação das funções lá embaixo.
--
--    >>> TROCAR <<<  a chave nas DUAS linhas abaixo
do $$
declare
  v_id uuid;
begin
  select id into v_id from vault.secrets where name = 'resend_api_key';

  if v_id is null then
    perform vault.create_secret(
      're_COLE_SUA_CHAVE_AQUI',
      'resend_api_key',
      'Chave do Resend usada para avisar sobre novos cadastros'
    );
    raise notice 'chave criada no Vault';
  else
    perform vault.update_secret(v_id, 're_COLE_SUA_CHAVE_AQUI');
    raise notice 'chave ja existia: atualizada';
  end if;
end $$;

-- 3. Função que envia o aviso. Separada do gatilho para poder ser testada
--    sozinha (ver o teste no fim do arquivo).
create or replace function public.avisar_novo_cadastro(
  p_nome    text,
  p_email   text,
  p_telefone text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_chave text;
  v_corpo text;
begin
  select decrypted_secret into v_chave
    from vault.decrypted_secrets where name = 'resend_api_key';

  if v_chave is null then
    raise warning 'resend_api_key nao encontrada no Vault: e-mail nao enviado';
    return;
  end if;

  v_corpo :=
    '<h2>Novo cadastro no site</h2>'
    || '<p><b>Nome:</b> '     || coalesce(p_nome, '(nao informado)')     || '</p>'
    || '<p><b>E-mail:</b> '   || coalesce(p_email, '(nao informado)')    || '</p>'
    || '<p><b>Telefone:</b> ' || coalesce(p_telefone, '(nao informado)') || '</p>'
    || '<hr>'
    || '<p>O cadastro entrou como <b>pendente</b>. Para liberar o acesso: '
    || 'Supabase &rarr; Table Editor &rarr; profiles &rarr; troque '
    || '<code>approved</code> de false para true.</p>';

  perform net.http_post(
    url     := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
                 'Content-Type',  'application/json',
                 'Authorization', 'Bearer ' || v_chave
               ),
    body    := jsonb_build_object(
                 -- >>> TROCAR <<< remetente (ver passo 3 no topo)
                 'from',    'GunsCore <onboarding@resend.dev>',
                 -- >>> TROCAR <<< quem recebe o aviso
                 'to',      jsonb_build_array('seu-email@exemplo.com'),
                 'subject', 'Novo cadastro no site: ' || coalesce(p_nome, p_email),
                 'html',    v_corpo
               )
  );
end;
$$;

-- 4. O gatilho existente passa a chamar o aviso.
--    O envio vai dentro de um bloco protegido de propósito: se o Resend
--    estiver fora do ar ou a chave errada, o CADASTRO NÃO PODE FALHAR.
--    Perder um cliente por causa de um e-mail de aviso seria absurdo.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.email
  );

  begin
    perform public.avisar_novo_cadastro(
      new.raw_user_meta_data->>'full_name',
      new.email,
      new.raw_user_meta_data->>'phone'
    );
  exception when others then
    raise warning 'aviso de cadastro nao enviado: %', sqlerrm;
  end;

  return new;
end;
$$;

-- (o gatilho em si continua o mesmo, já criado pelo supabase-setup.sql)

-- =====================================================================
--  TESTE — rode esta linha depois de configurar tudo.
--  Deve chegar um e-mail em alguns segundos. Se não chegar, veja em
--  Supabase → Logs → Postgres Logs se há algum "warning".
-- =====================================================================
-- select public.avisar_novo_cadastro('Teste da Silva', 'teste@exemplo.com', '(19) 99999-0000');

-- Para conferir as chamadas HTTP feitas pelo banco:
-- select id, status_code, created from net._http_response order by created desc limit 5;
