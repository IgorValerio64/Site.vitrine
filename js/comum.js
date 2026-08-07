// Peças usadas pelas duas páginas: topo, rodapé, cartões e o link do
// WhatsApp. Você não precisa mexer aqui — o conteúdo está em config.js.
import { NEGOCIO, AVISO_LEGAL, MENSAGEM_GERAL } from './config.js';

export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const dinheiro = (v) =>
  v > 0
    ? 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : 'Sob consulta';

// Monta o link do WhatsApp. encodeURIComponent é o que preserva acentos,
// quebras de linha e o asterisco do negrito.
export const linkWhats = (texto) =>
  `https://wa.me/${NEGOCIO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(texto)}`;

// Sem foto, o item ganha um bloco colorido com a inicial. A cor vem do
// próprio nome, então cada um fica sempre com a mesma — e a grade não vira
// um arco-íris diferente a cada carregamento.
export function corDoNome(nome) {
  let soma = 0;
  for (const c of nome) soma = (soma * 31 + c.charCodeAt(0)) % 360;
  return `hsl(${soma}, 42%, 82%)`;
}

// Usa NEGOCIO.iniciais quando definido: nem toda marca assina com as iniciais
// literais do nome.
export const iniciais = (nome) =>
  NEGOCIO.iniciais
  || nome.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

export const iconeWhats = () => `
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23z"/>
  </svg>`;

export const iconeLoja = () => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M2 7h20l-1.5 4.5a3 3 0 0 1-2.85 2.05H6.35A3 3 0 0 1 3.5 11.5L2 7Z"/>
    <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/>
    <path d="M5 13.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.5"/>
    <path d="M10 21v-4h4v4"/>
  </svg>`;

export const iconeMapa = () => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>`;

// Bloco de mídia reaproveitado por produtos e eventos.
export const midia = (item) =>
  item.foto
    ? `<img src="${esc(item.foto)}" alt="${esc(item.nome)}" loading="lazy" />`
    : `<div class="sem-foto" style="background:${corDoNome(item.nome)}">
         <span>${esc(item.nome.trim()[0] || '?')}</span>
       </div>`;

// `pagina` marca o link ativo no menu: 'home' ou 'produtos'.
export function montarTopo(pagina) {
  document.title = `${NEGOCIO.nome}${pagina === 'produtos' ? ' — Catálogo' : ''}`;
  document.documentElement.style.setProperty('--marca', NEGOCIO.cor);
  // O CSS troca a paleta inteira a partir deste atributo.
  document.documentElement.dataset.tema = NEGOCIO.tema === 'claro' ? 'claro' : 'escuro';

  const logo = NEGOCIO.logo
    ? `<img class="logo" src="${esc(NEGOCIO.logo)}" alt="${esc(NEGOCIO.nome)}" />`
    : `<div class="logo logo-texto">${esc(iniciais(NEGOCIO.nome))}</div>`;

  document.getElementById('topo').innerHTML = `
    <div class="container topo-inner">
      <a class="marca" href="index.html">
        ${logo}
        <span class="marca-nome">${esc(NEGOCIO.nome)}</span>
      </a>

      <nav class="menu">
        <a href="index.html" class="${pagina === 'home' ? 'ativo' : ''}">Início</a>
        <a href="produtos.html" class="${pagina === 'produtos' ? 'ativo' : ''}">Produtos</a>
        ${pagina === 'home' ? '<a href="#eventos">Eventos</a><a href="#lojas">Loja</a>' : ''}
      </nav>

      <a class="btn-whats" href="${linkWhats(MENSAGEM_GERAL())}" target="_blank" rel="noopener">
        ${iconeWhats()} WhatsApp
      </a>
    </div>`;

  // Arquivo de logo ausente ou com nome errado mostraria o ícone de imagem
  // quebrada — pior do que não ter logo. Aqui volta para as iniciais.
  const img = document.querySelector('.marca img.logo');
  if (img) {
    img.addEventListener('error', () => {
      const substituto = document.createElement('div');
      substituto.className = 'logo logo-texto';
      substituto.textContent = iniciais(NEGOCIO.nome);
      img.replaceWith(substituto);
      medirTopo();
    });
    // A imagem pode chegar depois da montagem e mudar a altura do cabeçalho.
    img.addEventListener('load', medirTopo);
  }

  medirTopo();
  window.addEventListener('resize', medirTopo);
}

// Publica a altura real do cabeçalho para o CSS, que a usa para grudar a
// barra de filtros logo abaixo dele.
function medirTopo() {
  const topo = document.getElementById('topo');
  if (!topo) return;
  document.documentElement.style.setProperty('--altura-topo', `${topo.offsetHeight}px`);
}

export function montarRodape() {
  document.getElementById('rodape').innerHTML = `
    <div class="container rodape-inner">
      <div>
        <strong>${esc(NEGOCIO.nome)}</strong>
        ${NEGOCIO.endereco ? `<p>${esc(NEGOCIO.endereco)}</p>` : ''}
        ${NEGOCIO.horario ? `<p>${esc(NEGOCIO.horario)}</p>` : ''}
        ${NEGOCIO.registro ? `<p>${esc(NEGOCIO.registro)}</p>` : ''}
        ${NEGOCIO.instagram
          ? `<p><a href="https://instagram.com/${esc(NEGOCIO.instagram)}" target="_blank" rel="noopener">@${esc(NEGOCIO.instagram)}</a></p>`
          : ''}
      </div>
      <a class="btn-whats grande" href="${linkWhats(MENSAGEM_GERAL())}" target="_blank" rel="noopener">
        ${iconeWhats()} Fale conosco
      </a>
    </div>

    ${AVISO_LEGAL ? `
      <div class="container">
        <p class="aviso-legal">${esc(AVISO_LEGAL)}</p>
      </div>` : ''}`;
}
