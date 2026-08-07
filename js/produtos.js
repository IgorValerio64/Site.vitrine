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

const cardProduto = (p) => {
  const preco = dinheiro(p.preco);
  return `
    <article class="card">
      <div class="card-midia">
        ${midia(p)}
        ${p.destaque ? '<span class="etiqueta">Destaque</span>' : ''}
      </div>
      <div class="card-corpo">
        ${p.categoria ? `<span class="card-cat">${esc(p.categoria)}</span>` : ''}
        <h3>${esc(p.nome)}</h3>
        ${p.descricao ? `<p class="card-desc">${esc(p.descricao)}</p>` : ''}
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

function render() {
  const lista = filtrados();

  document.getElementById('grade').innerHTML = lista.length
    ? lista.map(cardProduto).join('')
    : `<p class="vazio">Nenhum produto encontrado para
         <strong>${esc(estado.busca)}</strong>.</p>`;

  document.getElementById('contador').textContent =
    `${lista.length} ${lista.length === 1 ? 'produto' : 'produtos'}`;

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
