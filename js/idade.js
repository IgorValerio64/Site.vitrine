// Verificação de idade — a tela que cobre o site antes de qualquer conteúdo.
//
// Carregado ANTES do script da página em cada HTML, para a cortina subir sem
// deixar o conteúdo piscar. Não depende de nenhum outro módulo do site.
import { NEGOCIO, VERIFICACAO_IDADE as V } from './config.js';

const CHAVE = 'gsc_idade_ok';

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Resposta guardada com validade. Depois de `lembrarDias`, pergunta de novo —
// gravar "para sempre" num computador compartilhado seria pior.
function jaConfirmou() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return false;
    const { ok, ate } = JSON.parse(bruto);
    if (!ok || Date.now() > ate) { localStorage.removeItem(CHAVE); return false; }
    return true;
  } catch {
    return false;
  }
}

function guardar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({
      ok: true,
      ate: Date.now() + (V.lembrarDias || 30) * 86400000,
    }));
  } catch { /* navegação anônima com storage bloqueado: só não lembra */ }
}

function montar() {
  document.documentElement.style.setProperty('--marca', NEGOCIO.cor);
  document.documentElement.dataset.tema = NEGOCIO.tema === 'claro' ? 'claro' : 'escuro';

  const cortina = document.createElement('div');
  cortina.className = 'idade';
  cortina.setAttribute('role', 'dialog');
  cortina.setAttribute('aria-modal', 'true');
  cortina.innerHTML = `
    <div class="idade-caixa">
      ${NEGOCIO.logo
        ? `<img class="idade-logo" src="${esc(NEGOCIO.logo)}" alt="${esc(NEGOCIO.nome)}" />`
        : `<div class="idade-marca">${esc(NEGOCIO.nome)}</div>`}

      <h1>${esc(V.titulo)}</h1>
      <h2>${esc(V.pergunta)}</h2>

      <div class="idade-botoes">
        <button class="idade-btn" data-resposta="sim">${esc(V.sim || 'Sim')}</button>
        <button class="idade-btn" data-resposta="nao">${esc(V.nao || 'Não')}</button>
      </div>

      <p class="idade-aviso">${esc(V.aviso)}</p>
    </div>`;

  // Trava a rolagem do conteúdo atrás da cortina.
  document.documentElement.classList.add('idade-travado');
  (document.body || document.documentElement).appendChild(cortina);

  cortina.querySelector('[data-resposta="sim"]').onclick = () => {
    guardar();
    document.documentElement.classList.remove('idade-travado');
    cortina.classList.add('saindo');
    setTimeout(() => cortina.remove(), 260);
  };

  cortina.querySelector('[data-resposta="nao"]').onclick = () => {
    // Não redireciona para fora: mandar o visitante para outro site sem aviso
    // é hostil. Mostra o motivo e mantém a porta fechada.
    cortina.querySelector('.idade-caixa').innerHTML = `
      ${NEGOCIO.logo ? `<img class="idade-logo" src="${esc(NEGOCIO.logo)}" alt="" />` : ''}
      <h2 class="idade-negado">${esc(V.recusa)}</h2>`;
  };
}

if (V?.ativo && !jaConfirmou()) {
  // O <body> pode ainda não existir quando o módulo roda.
  if (document.body) montar();
  else document.addEventListener('DOMContentLoaded', montar, { once: true });
}
