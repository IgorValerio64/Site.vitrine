import { NEGOCIO, SOBRE, EVENTOS, LOJAS, SECAO_LOJA, MENSAGEM_EVENTO } from './config.js';
import {
  esc, linkWhats, iconeWhats, iconeLoja, iconeMapa, midia,
  montarTopo, montarRodape,
} from './comum.js';

// Página inicial: marca, sobre a empresa e agenda de eventos.

montarTopo('home');

// --- capa -------------------------------------------------------------
document.getElementById('capa').innerHTML = `
  <div class="container capa-inner">
    <h1>${esc(NEGOCIO.nome)}</h1>
    ${NEGOCIO.slogan ? `<p class="capa-slogan">${esc(NEGOCIO.slogan)}</p>` : ''}
    <div class="capa-acoes">
      <a class="btn-marca" href="produtos.html">Ver produtos</a>
      <a class="btn-whats grande" href="${linkWhats('Olá! Vi o site e gostaria de mais informações.')}"
         target="_blank" rel="noopener">${iconeWhats()} Falar no WhatsApp</a>
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

montarRodape();
