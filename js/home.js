import {
  NEGOCIO, SOBRE, SERVICOS, EVENTOS, LOJAS, SECAO_LOJA,
  AVALIACOES, GRUPO_VIP, MENSAGEM_EVENTO, MENSAGEM_SERVICO,
} from './config.js';
import {
  esc, linkWhats, iconeWhats, iconeLoja, iconeMapa, midia,
  montarTopo, montarRodape,
} from './comum.js';

// Página inicial: marca, sobre a empresa e agenda de eventos.

montarTopo('home');

// --- capa -------------------------------------------------------------
const capaEl = document.getElementById('capa');
// Com imagem definida, a capa vira um "hero" de fundo: o nome e os botões
// ficam por cima da foto. A URL é resolvida ABSOLUTA a partir da página —
// url() relativo dentro do CSS resolveria a partir de /css/ e daria 404.
if (NEGOCIO.capa) {
  capaEl.classList.add('capa--imagem');
  const capaUrl = new URL(NEGOCIO.capa, location.href).href;
  capaEl.style.backgroundImage =
    `linear-gradient(rgba(12, 12, 14, .45), rgba(12, 12, 14, .70)), url("${capaUrl}")`;
}
capaEl.innerHTML = `
  <div class="container capa-inner">
    <h1>${esc(NEGOCIO.nome)}</h1>
    ${NEGOCIO.slogan ? `<p class="capa-slogan">${esc(NEGOCIO.slogan)}</p>` : ''}
    <div class="capa-acoes">
      <a class="btn-marca" href="produtos.html">Ver produtos</a>
    </div>
  </div>`;

// --- sobre ------------------------------------------------------------
document.getElementById('sobre').innerHTML = `
  <div class="container">
    <div class="bloco-sobre">
      <h2>${esc(SOBRE.titulo)}</h2>
      ${SOBRE.paragrafos.map((p) => `<p>${esc(p)}</p>`).join('')}

      ${SOBRE.numeros?.length ? `
        <div class="numeros">
          ${SOBRE.numeros.map((n) => `
            <div class="numero">
              <strong>${esc(n.valor)}</strong>
              <span>${esc(n.rotulo)}</span>
            </div>`).join('')}
        </div>` : ''}
    </div>
  </div>`;

// --- serviços / assessoria --------------------------------------------
const iconeEscudo = () => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>`;

const cardServico = (s) => `
  <article class="card-servico">
    <span class="servico-icone">${iconeEscudo()}</span>
    <h3>${esc(s.nome)}</h3>
    ${s.descricao ? `<p>${esc(s.descricao)}</p>` : ''}
    <a class="btn-whats bloco" href="${linkWhats(MENSAGEM_SERVICO(s))}"
       target="_blank" rel="noopener"
       aria-label="Consultar sobre ${esc(s.nome)} pelo WhatsApp">
      ${iconeWhats()} Consultar
    </a>
  </article>`;

const secaoServicos = document.getElementById('servicos');
if (SERVICOS?.itens?.length) {
  secaoServicos.innerHTML = `
    <div class="container">
      <div class="secao-cabecalho">
        <h2>${esc(SERVICOS.titulo)}</h2>
        ${SERVICOS.subtitulo ? `<p>${esc(SERVICOS.subtitulo)}</p>` : ''}
      </div>
      <div class="grade-servicos">${SERVICOS.itens.map(cardServico).join('')}</div>
    </div>`;
} else {
  secaoServicos.remove();
}

// --- eventos ----------------------------------------------------------
const cardEvento = (e) => `
  <article class="card ${e.encerrado ? 'encerrado' : ''}">
    <div class="card-midia">
      ${midia(e)}
      ${e.destaque && !e.encerrado ? '<span class="etiqueta">Destaque</span>' : ''}
      ${e.encerrado ? '<span class="etiqueta cinza">Encerrado</span>' : ''}
    </div>
    <div class="card-corpo">
      ${e.data ? `<span class="card-cat">${esc(e.data)}</span>` : ''}
      <h3>${esc(e.nome)}</h3>
      ${e.local ? `<p class="card-local">${esc(e.local)}</p>` : ''}
      ${e.descricao ? `<p class="card-desc">${esc(e.descricao)}</p>` : ''}
      ${e.encerrado ? '' : `
        <div class="card-rodape">
          <a class="btn-whats bloco" href="${linkWhats(MENSAGEM_EVENTO(e))}"
             target="_blank" rel="noopener"
             aria-label="Saber mais sobre ${esc(e.nome)} pelo WhatsApp">
            ${iconeWhats()} Quero participar
          </a>
        </div>`}
    </div>
  </article>`;

document.getElementById('eventos').innerHTML = `
  <div class="container">
    <div class="secao-cabecalho">
      <h2>Eventos</h2>
      <p>O que a empresa realiza ao longo do ano. Fale com a gente para participar.</p>
    </div>
    ${EVENTOS.length
      ? `<div class="grade">${EVENTOS.map(cardEvento).join('')}</div>`
      : '<p class="vazio">Nenhum evento no momento. Volte em breve.</p>'}
  </div>`;

// --- lojas ------------------------------------------------------------
// Leva para fora do site (loja online ou mapa), por isso abre em outra aba:
// o visitante não perde o catálogo que estava vendo.
// O texto padrão evita prometer o que o clique não faz: sem carrinho do outro
// lado, "Comprar online" engana o visitante.
const rotuloBotao = (l) => l.botao || (l.tipo === 'fisica' ? 'Ver no mapa' : 'Ver a vitrine');

// Só destino externo abre em outra aba. Página do próprio site abre na mesma:
// jogar o visitante numa aba nova para ir do início ao catálogo confunde e
// quebra o botão "voltar" do navegador.
const ehExterno = (url) => /^https?:\/\//i.test(url);

const cardLoja = (l) => {
  const fora = ehExterno(l.url);
  return `
    <a class="card-loja" href="${esc(l.url)}"
       ${fora ? 'target="_blank" rel="noopener"' : ''}>
      <span class="loja-icone">${l.tipo === 'fisica' ? iconeMapa() : iconeLoja()}</span>
      <span class="loja-texto">
        <strong>${esc(l.nome)}</strong>
        ${l.descricao ? `<span class="loja-desc">${esc(l.descricao)}</span>` : ''}
      </span>
      <span class="btn-marca pequeno">${esc(rotuloBotao(l))}</span>
    </a>`;
};

const secaoLojas = document.getElementById('lojas');
if (LOJAS.length) {
  secaoLojas.innerHTML = `
    <div class="container">
      <div class="secao-cabecalho">
        <h2>${esc(SECAO_LOJA.titulo)}</h2>
        ${SECAO_LOJA.subtitulo ? `<p>${esc(SECAO_LOJA.subtitulo)}</p>` : ''}
      </div>
      <div class="grade-lojas">${LOJAS.map(cardLoja).join('')}</div>
    </div>`;
} else {
  secaoLojas.remove();
}

// --- avaliações -------------------------------------------------------
const estrelas = (n = 5) =>
  `<span class="estrelas" aria-label="${n} de 5 estrelas">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</span>`;

// Sem a tag <header> aqui: o CSS do site já usa <header> para a barra do topo,
// e um cabeçalho de card herdando aquilo vira uma barra grudada na tela.
const cardAvaliacao = (a) => `
  <article class="card-avaliacao">
    <div class="ava-topo">
      ${a.foto
        ? `<img class="ava-foto" src="${esc(a.foto)}" alt="" loading="lazy" />`
        : `<span class="ava-inicial">${esc((a.nome || '?').trim()[0])}</span>`}
      <div class="ava-quem">
        <strong>${esc(a.nome)}</strong>
        <span class="ava-linha">
          ${estrelas(a.nota || 5)}
          ${a.quando ? `<span class="ava-quando">${esc(a.quando)}</span>` : ''}
          ${a.selo ? `<span class="ava-selo">${esc(a.selo)}</span>` : ''}
        </span>
      </div>
    </div>
    <p>${esc(a.texto).replace(/\n/g, '<br>')}</p>
  </article>`;

const secaoAval = document.getElementById('avaliacoes');
if (AVALIACOES?.itens?.length) {
  secaoAval.innerHTML = `
    <div class="container">
      <div class="secao-cabecalho centro">
        ${estrelas(5)}
        <h2>${esc(AVALIACOES.titulo)}</h2>
        <p>
          Loja <b>${esc(AVALIACOES.nota)} estrelas</b> ${esc(AVALIACOES.subtitulo)}.
          ${AVALIACOES.link
            ? `<a class="link-marca" href="${esc(AVALIACOES.link)}" target="_blank" rel="noopener">Veja aqui!</a>`
            : ''}
        </p>
      </div>

      <div class="carrossel">
        <button class="carrossel-seta" data-dir="-1" aria-label="Anterior">‹</button>
        <div class="carrossel-trilho" id="trilho-aval">
          ${AVALIACOES.itens.map(cardAvaliacao).join('')}
        </div>
        <button class="carrossel-seta" data-dir="1" aria-label="Próximo">›</button>
      </div>
    </div>`;

  // Setas rolam o trilho; no celular o dedo arrasta e o snap alinha os cards.
  const trilho = document.getElementById('trilho-aval');
  secaoAval.querySelectorAll('.carrossel-seta').forEach((b) => {
    b.onclick = () => {
      const card = trilho.querySelector('.card-avaliacao');
      const passo = card ? card.offsetWidth + 16 : trilho.clientWidth * 0.8;
      trilho.scrollBy({ left: passo * Number(b.dataset.dir), behavior: 'smooth' });
    };
  });
} else {
  secaoAval.remove();
}

// --- grupo VIP do WhatsApp --------------------------------------------
const secaoVip = document.getElementById('grupo-vip');
const temLink = !!GRUPO_VIP?.url;

if (GRUPO_VIP) {
  if (GRUPO_VIP.imagem) {
    const url = new URL(GRUPO_VIP.imagem, location.href).href;
    secaoVip.style.backgroundImage =
      `linear-gradient(rgba(10,10,12,.72), rgba(10,10,12,.82)), url("${url}")`;
    secaoVip.classList.add('com-imagem');
  }

  // Sem o link de convite, o botão fica inerte e avisa o que falta — assim a
  // faixa pode ser vista na pré-visualização sem virar um clique que não leva
  // a lugar nenhum se o site for publicado antes de configurar.
  const acao = temLink
    ? `<a class="btn-vip" href="${esc(GRUPO_VIP.url)}" target="_blank" rel="noopener">
         ${iconeWhats()} ${esc(GRUPO_VIP.botao || 'Entrar no grupo')}
       </a>`
    : `<span class="btn-vip inerte">${iconeWhats()} ${esc(GRUPO_VIP.botao || 'Entrar no grupo')}</span>
       <p class="vip-pendente">Falta o link de convite do grupo — preencha <code>GRUPO_VIP.url</code> no config.js</p>`;

  secaoVip.innerHTML = `
    <div class="container vip-inner">
      ${GRUPO_VIP.chapeu ? `<span class="vip-chapeu">${esc(GRUPO_VIP.chapeu)}</span>` : ''}
      <h2>${esc(GRUPO_VIP.titulo)}</h2>
      ${GRUPO_VIP.texto ? `<p>${esc(GRUPO_VIP.texto)}</p>` : ''}
      ${acao}
    </div>`;
} else {
  secaoVip.remove();
}

montarRodape();
