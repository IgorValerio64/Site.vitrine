import { montarTopo, montarRodape, esc, linkWhats, iconeWhats } from './comum.js';
import { getSessao, getPerfil, logout } from './auth.js';

montarTopo('');
montarRodape();

const el = document.getElementById('conteudo');
el.innerHTML = `<div class="conta-card"><p class="conta-msg">Carregando...</p></div>`;

(async () => {
  const sessao = await getSessao();
  if (!sessao) { location.href = 'entrar.html'; return; }

  const perfil = await getPerfil();
  const nome = perfil?.full_name || sessao.user.email;
  const primeiro = (nome || '').split(' ')[0];

  if (!perfil || !perfil.approved) {
    // conta pendente de aprovação
    el.innerHTML = `
      <div class="conta-card">
        <span class="conta-badge pendente">Em análise</span>
        <h2>Olá, ${esc(primeiro)}!</h2>
        <p>Seu cadastro foi recebido e está <strong>em análise</strong>. Assim que for
           aprovado, você terá acesso à área do cliente aqui mesmo.</p>
        <p class="conta-obs">Quer agilizar? Fale com a gente:</p>
        <a class="btn-whats grande bloco-conta" target="_blank" rel="noopener"
           href="${linkWhats('Olá! Acabei de me cadastrar no site e gostaria de liberar meu acesso.')}">
          ${iconeWhats()} Falar no WhatsApp
        </a>
        <button class="conta-link" id="sair">Sair</button>
      </div>`;
  } else {
    // conta aprovada — área do cliente (conteúdo inicial; a gente expande depois)
    el.innerHTML = `
      <div class="conta-card larga">
        <span class="conta-badge ok">Conta ativa</span>
        <h2>Bem-vindo, ${esc(primeiro)}! 👋</h2>
        <p>Esta é a sua área de cliente.</p>
        <div class="conta-dados">
          <div><span>Nome</span><strong>${esc(perfil.full_name || '—')}</strong></div>
          <div><span>E-mail</span><strong>${esc(sessao.user.email)}</strong></div>
          <div><span>Telefone</span><strong>${esc(perfil.phone || '—')}</strong></div>
        </div>
        <p class="conta-obs">Em breve por aqui: seus pedidos, documentos e novidades exclusivas.</p>
        <button class="conta-link" id="sair">Sair</button>
      </div>`;
  }

  document.getElementById('sair').onclick = async () => {
    await logout();
    location.href = 'index.html';
  };
})();
