import { PRODUTOS, MENSAGEM, DOC_ENVIO, FAQ } from './config.js';
import { esc, dinheiro, linkWhats, iconeWhats, midia, montarTopo, montarRodape } from './comum.js';

// Página do catálogo: busca, filtro por categoria e pedido pelo WhatsApp.

montarTopo('produtos');
montarRodape();

// Filtros vindos do menu de departamentos, pela URL:
//   produtos.html?tipo=Pistolas   ?marca=GLOCK   ?calibre=.9MM
// Ficar na URL permite recarregar a página e compartilhar o link filtrado.
const params = new URLSearchParams(location.search);
const estado = {
  busca: params.get('busca') || '',
  categoria: 'todas',
  tipo: params.get('tipo') || '',
  marca: params.get('marca') || '',
  calibre: params.get('calibre') || '',
};

const categorias = () =>
  ['todas', ...new Set(PRODUTOS.map((p) => p.categoria).filter(Boolean))];

// Comparação frouxa: o menu escreve ".9MM" e o produto pode ter ".9mm".
const igual = (a, b) =>
  String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();

// Um produto pode ter mais de um calibre: aceita string ou lista.
const contem = (campo, valor) =>
  Array.isArray(campo) ? campo.some((v) => igual(v, valor)) : igual(campo, valor);

function filtrados() {
  const termo = estado.busca.trim().toLowerCase();
  return PRODUTOS.filter((p) => {
    const naCategoria = estado.categoria === 'todas' || p.categoria === estado.categoria;
    const noTipo = !estado.tipo || contem(p.tipo, estado.tipo) || igual(p.categoria, estado.tipo);
    const naMarca = !estado.marca || contem(p.marca, estado.marca);
    const noCalibre = !estado.calibre || contem(p.calibre, estado.calibre);
    const noTermo = !termo
      || p.nome.toLowerCase().includes(termo)
      || (p.descricao || '').toLowerCase().includes(termo)
      || (p.codigo || '').toLowerCase().includes(termo);
    return naCategoria && noTipo && naMarca && noCalibre && noTermo;
  });
}

// Mostra o filtro ativo com um X para limpar — sem isso, quem chega pelo menu
// vê poucos produtos e não entende que há um filtro aplicado.
function avisoFiltroHTML() {
  const ativos = [
    estado.tipo && ['Tipo', estado.tipo],
    estado.marca && ['Marca', estado.marca],
    estado.calibre && ['Calibre', estado.calibre],
  ].filter(Boolean);

  if (!ativos.length) return '';
  return `
    <div class="filtro-ativo">
      ${ativos.map(([r, v]) => `<span class="filtro-tag">${r}: <b>${esc(v)}</b></span>`).join('')}
      <a class="filtro-limpar" href="produtos.html">limpar filtro ✕</a>
    </div>`;
}

const cardProduto = (p, idx) => {
  const preco = dinheiro(p.preco);
  return `
    <article class="card card-clicavel" data-idx="${idx}">
      <div class="card-midia">
        ${midia(p)}
        ${p.destaque ? '<span class="etiqueta">Destaque</span>' : ''}
      </div>
      <div class="card-corpo">
        ${p.categoria ? `<span class="card-cat">${esc(p.categoria)}</span>` : ''}
        <h3>${esc(p.nome)}</h3>
        ${p.descricao ? `<p class="card-desc">${esc(p.descricao)}</p>` : ''}
        ${p.specs ? '<span class="card-ficha">Ver especificações →</span>' : ''}
        <div class="card-rodape">
          <span class="preco ${p.preco > 0 ? '' : 'consulta'}">${preco}</span>
          <a class="btn-whats" href="${linkWhats(MENSAGEM(p, preco))}"
             target="_blank" rel="noopener"
             aria-label="Consultar ${esc(p.nome)} pelo WhatsApp">
            ${iconeWhats()} Consultar
          </a>
        </div>
      </div>
    </article>`;
};

// Ficha do produto (modal) com abas: Descrição, Ficha técnica, Documentação
// e envio, Perguntas frequentes. As duas últimas são iguais p/ todos (config).
function abrirProduto(p) {
  const preco = dinheiro(p.preco);
  const desc = p.descLonga || p.descricao || '';

  const paneDesc = desc ? `<p>${esc(desc)}</p>` : '<p class="ficha-vazio">Sem descrição.</p>';
  const paneSpecs = p.specs
    ? `<ul class="ficha-specs">${Object.entries(p.specs).map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join('')}</ul>
       ${p.codigo ? `<p class="modal-codigo">Código: ${esc(p.codigo)}</p>` : ''}`
    : '<p class="ficha-vazio">Ficha técnica em breve.</p>';
  const paneDoc = DOC_ENVIO.map((s) => `<h4>${esc(s.titulo)}</h4><p>${esc(s.texto)}</p>`).join('');
  const paneFaq = FAQ.map((f) => `<div class="faq-item"><strong>${esc(f.pergunta)}</strong><p>${esc(f.resposta)}</p></div>`).join('');

  const ov = document.createElement('div');
  ov.className = 'modal-overlay';
  ov.innerHTML = `
    <div class="modal-produto" role="dialog" aria-modal="true">
      <button class="modal-fechar" aria-label="Fechar">&times;</button>
      <div class="modal-midia">${midia(p)}</div>
      <div class="modal-corpo">
        ${p.categoria ? `<span class="card-cat">${esc(p.categoria)}</span>` : ''}
        <h2>${esc(p.nome)}</h2>
        <span class="preco ${p.preco > 0 ? '' : 'consulta'}">${preco}</span>

        <div class="ficha-tabs">
          <button class="ficha-tab ativo" data-t="desc">Descrição</button>
          <button class="ficha-tab" data-t="specs">Ficha técnica</button>
          <button class="ficha-tab" data-t="doc">Documentação e envio</button>
          <button class="ficha-tab" data-t="faq">Perguntas frequentes</button>
        </div>
        <div class="ficha-panes">
          <div class="ficha-pane ativo" data-p="desc">${paneDesc}</div>
          <div class="ficha-pane" data-p="specs">${paneSpecs}</div>
          <div class="ficha-pane" data-p="doc">${paneDoc}</div>
          <div class="ficha-pane" data-p="faq">${paneFaq}</div>
        </div>

        <a class="btn-whats grande bloco" target="_blank" rel="noopener"
           href="${linkWhats(MENSAGEM(p, preco))}">${iconeWhats()} Consultar no WhatsApp</a>
      </div>
    </div>`;

  ov.querySelectorAll('.ficha-tab').forEach((tab) => {
    tab.onclick = () => {
      ov.querySelectorAll('.ficha-tab').forEach((t) => t.classList.toggle('ativo', t === tab));
      ov.querySelectorAll('.ficha-pane').forEach((pn) => pn.classList.toggle('ativo', pn.dataset.p === tab.dataset.t));
    };
  });

  const fechar = () => { ov.remove(); document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  const onKey = (e) => { if (e.key === 'Escape') fechar(); };
  ov.addEventListener('click', (e) => { if (e.target === ov) fechar(); });
  ov.querySelector('.modal-fechar').onclick = fechar;
  document.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(ov);
}

function render() {
  const lista = filtrados();

  const oQueBuscou = estado.busca
    || [estado.tipo, estado.marca, estado.calibre].filter(Boolean).join(' · ');

  document.getElementById('grade').innerHTML = lista.length
    ? lista.map((p, i) => cardProduto(p, i)).join('')
    : `<p class="vazio">Nenhum produto encontrado para
         <strong>${esc(oQueBuscou)}</strong>.<br>
         <a class="link-marca" href="produtos.html">Ver o catálogo completo</a></p>`;

  document.getElementById('contador').textContent =
    `${lista.length} ${lista.length === 1 ? 'produto' : 'produtos'}`;

  // clicar no card abre a ficha; clique no botão do WhatsApp segue pro zap.
  document.querySelectorAll('.card-clicavel').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.btn-whats')) return;
      const p = lista[+el.dataset.idx];
      if (p) abrirProduto(p);
    });
  });

  document.querySelectorAll('.chip').forEach((c) => {
    c.classList.toggle('ativo', c.dataset.cat === estado.categoria);
  });
}

document.getElementById('filtros').innerHTML = `
  <div class="container">
    <input id="busca" class="busca" type="search" value="${esc(estado.busca)}"
           placeholder="Buscar produto..." autocomplete="off" />
    ${avisoFiltroHTML()}
    <div class="chips">
      ${categorias().map((c) => `
        <button class="chip" data-cat="${esc(c)}">
          ${c === 'todas' ? 'Todos' : esc(c)}
        </button>`).join('')}
    </div>
    <span id="contador" class="contador"></span>
  </div>`;

const busca = document.getElementById('busca');
let timer;
busca.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(() => { estado.busca = busca.value; render(); }, 200);
});

document.querySelectorAll('.chip').forEach((c) => {
  c.addEventListener('click', () => { estado.categoria = c.dataset.cat; render(); });
});

render();
