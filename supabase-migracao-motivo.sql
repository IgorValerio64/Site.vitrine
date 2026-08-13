-- =====================================================================
--  Migração: guardar o motivo informado no cadastro
--
--  Para quem JÁ rodou o supabase-setup.sql e o supabase-email-cadastro.sql.
--  Em instalação nova, os dois arquivos já vêm com o motivo incluído e esta
--  migração não é necessária.
--
--  Supabase → SQL Editor → cole tudo → Run. Pode rodar mais de uma vez.
--
--  NÃO precisa da chave do Resend: ela já está no Vault.
-- =====================================================================

-- 1. Coluna nova na tabela de perfis.
alter table public.profiles
  add column if not exists motivo text;

-- 2. O gatilho passa a copiar o motivo dos metadados do cadastro.
--
--    ATENÇÃO À ORDEM: esta função é a mesma redefinida pelo
--    supabase-email-cadastro.sql. Se você rodar aquele arquivo DEPOIS deste,
--    o motivo volta a não ser gravado — e se rodar o supabase-setup.sql
--    depois, o aviso por e-mail para de sair. Esta versão junta as duas
--    coisas, então é a última que deve rodar.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, email, motivo)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.email,
    new.raw_user_meta_data->>'motivo'
  );

  -- Bloco protegido: se o e-mail falhar, o CADASTRO É CONCLUÍDO DO MESMO
  -- JEITO. Perder um cliente por causa de um aviso interno seria pior.
  begin
    perform public.avisar_novo_cadastro(
      new.raw_user_meta_data->>'full_name',
      new.email,
      new.raw_user_meta_data->>'phone',
      new.raw_user_meta_data->>'motivo'
    );
  exception when others then
    raise warning 'aviso de cadastro nao enviado: %', sqlerrm;
  end;

  return new;
end;
$$;

-- 3. O e-mail de aviso passa a mostrar o motivo.
--    A assinatura ganhou um quarto parâmetro, então a versão antiga de 3
--    parâmetros é removida para não ficarem duas funções com o mesmo nome.
drop function if exists public.avisar_novo_cadastro(text, text, text);

create or replace function public.avisar_novo_cadastro(
  p_nome     text,
  p_email    text,
  p_telefone text,
  p_motivo   text default null
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
    || '<p><b>O que procura:</b><br>'
    -- Texto escrito pelo visitante: escapa o HTML para ninguém injetar
    -- marcação no e-mail, e converte as quebras de linha.
    || replace(
         replace(
           replace(coalesce(p_motivo, '(nao informado)'), '&', '&amp;'),
           '<', '&lt;'),
         chr(10), '<br>')
    || '</p>'
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
                 'from',    'GunsCore <onboarding@resend.dev>',
                 -- >>> TROCAR se a conta do Resend usar outro e-mail <<<
                 'to',      jsonb_build_array('igortatuvalerio@gmail.com'),
                 'subject', 'Novo cadastro no site: ' || coalesce(p_nome, p_email),
                 'html',    v_corpo
               )
  );
end;
$$;

-- =====================================================================
--  TESTE
-- =====================================================================
-- select public.avisar_novo_cadastro(
--   'Teste da Silva', 'teste@exemplo.com', '(19) 99999-0000',
--   'Sou CAC e procuro municao .38 SPL e um coldre.'
-- );

-- Ver os cadastros com o motivo:
-- select full_name, email, phone, motivo, approved, created_at
--   from public.profiles order by created_at desc;
