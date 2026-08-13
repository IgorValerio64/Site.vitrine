-- =====================================================================
--  Site.vitrine — configuração do banco no Supabase (login de cliente)
--
--  Rode UMA VEZ no painel do Supabase: SQL Editor → cole tudo → Run.
--  Cria a tabela de perfis, a regra de segurança (RLS) e o gatilho que
--  cria um perfil (pendente de aprovação) a cada novo cadastro.
-- =====================================================================

-- 1. Perfil de cada usuário. `approved` controla o acesso à área do cliente.
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,
  email      text,
  motivo     text,                             -- o que a pessoa escreveu no cadastro
  approved   boolean not null default false,   -- você libera trocando pra true
  created_at timestamptz not null default now()
);

-- Para bancos criados antes do campo `motivo` existir.
alter table public.profiles add column if not exists motivo text;

-- 2. Segurança em nível de linha: cada pessoa só lê o PRÓPRIO perfil.
alter table public.profiles enable row level security;

drop policy if exists "ler o proprio perfil" on public.profiles;
create policy "ler o proprio perfil" on public.profiles
  for select using (auth.uid() = id);

-- (Sem política de UPDATE/INSERT pros usuários: o perfil é criado pelo gatilho
--  abaixo, e o `approved` só muda por você, aqui pelo painel do Supabase.)

-- 3. Gatilho: ao criar um usuário no Auth, cria o perfil copiando nome/telefone
--    dos metadados do cadastro. SECURITY DEFINER pra poder inserir apesar da RLS.
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
  return new;
end;
$$;

-- ATENÇÃO: se você usa o aviso por e-mail, rode o supabase-email-cadastro.sql
-- DEPOIS deste arquivo. Ele redefine esta mesma função acrescentando o envio;
-- rodar na ordem inversa faz o aviso parar de sair.

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
--  Como APROVAR um cliente depois:
--  Supabase → Table Editor → tabela "profiles" → acha a linha da pessoa →
--  troca "approved" de false pra true. Pronto, ela ganha acesso à área.
-- =====================================================================
