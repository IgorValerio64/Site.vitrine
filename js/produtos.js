import { PRODUTOS, MENSAGEM } from './config.js';
import { esc, dinheiro, linkWhats, iconeWhats, midia, montarTopo, montarRodape } from './comum.js';

// Página do catálogo: busca, filtro por categoria e pedido pelo WhatsApp.

montarTopo('produtos');
montarRodape();

const estado = { busca: '', categoria: 'todas' };

const categorias = () =>
  ['todas', ...new Set(PRODUTOS.map((p) => p.categoria).filter(Boolean))];

function filtrados() {
  const termo = estado.busca.trim().toLowerCase();
  return PRODUTOS.filter((p) => {
    const naCategoria = estado.categoria === 'todas' || p.categoria === estado.categoria;
    const noTermo = !termo
      || p.nome.toLowerCase().includes(termo)
      || (p.descricao || '').toLowerCase().includes(termo)
      || (p.codigo || '').toLowerCase().includes(termo);
    return naCategoria && noTermo;
  });
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

// Ficha do produto (modal): foto, descrição, código, especificações e WhatsApp.
function abrirProduto(p) {
  const preco = dinheiro(p.preco);
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
        ${p.descricao ? `<p class="modal-desc">${esc(p.descricao)}</p>` : ''}
        ${p.specs ? `
          <table class="specs"><tbody>
            ${Object.entries(p.specs).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}
          </tbody></table>` : ''}
        ${p.codigo ? `<p class="modal-codigo">Código: ${esc(p.codigo)}</p>` : ''}
        <a class="btn-whats grande bloco" target="_blank" rel="noopener"
           href="${linkWhats(MENSAGEM(p, preco))}">${iconeWhats()} Consultar no WhatsApp</a>
      </div>
    </div>`;

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

  document.getElementById('grade').innerHTML = lista.length
    ? lista.map((p, i) => cardProduto(p, i)).join('')
    : `<p class="vazio">Nenhum produto encontrado para
         <strong>${esc(estado.busca)}</strong>.</p>`;

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
    <input id="busca" class="busca" type="search"
           placeholder="Buscar produto..." autocomplete="off" />
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
