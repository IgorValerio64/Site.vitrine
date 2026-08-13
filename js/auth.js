// Helpers de autenticação do cliente (cadastro, login, perfil, logout).
import { supa } from './supabase.js';

export async function getSessao() {
  const { data } = await supa.auth.getSession();
  return data.session;
}

export async function getUsuario() {
  const { data } = await supa.auth.getUser();
  return data.user;
}

// Perfil (tabela public.profiles): tem o nome, telefone e o status `approved`.
export async function getPerfil() {
  const user = await getUsuario();
  if (!user) return null;
  const { data, error } = await supa
    .from('profiles').select('*').eq('id', user.id).single();
  if (error) return null;
  return data;
}

// Cadastro: cria o usuário no Auth e (via trigger no banco) um perfil pendente.
// Nome, telefone e motivo vão nos metadados; o trigger copia pra tabela profiles.
export function cadastrar({ nome, telefone, email, senha, motivo }) {
  return supa.auth.signUp({
    email,
    password: senha,
    options: { data: { full_name: nome, phone: telefone, motivo } },
  });
}

export function login(email, senha) {
  return supa.auth.signInWithPassword({ email, password: senha });
}

export function logout() {
  return supa.auth.signOut();
}
