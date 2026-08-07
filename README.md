# Site vitrine com pedido pelo WhatsApp

Duas páginas:

- **`index.html`** — página inicial: logo e nome da empresa, texto institucional,
  agenda de eventos e os links para a loja.
- **`produtos.html`** — catálogo, com busca e filtro por categoria.

Em produtos e eventos, cada botão leva o cliente direto para o WhatsApp com a
mensagem já escrita, informando o que ele escolheu.

Site **estático**: só HTML, CSS e JavaScript. Não precisa de servidor, banco de
dados nem instalação — roda no GitHub Pages de graça.

## Como editar

Abra **`js/config.js`**. Tudo que você precisa mudar está lá.

### 1. Dados do negócio

```js
export const NEGOCIO = {
  nome: 'Loja Exemplo',
  slogan: 'Produtos selecionados e eventos sob medida',
  logo: '',                    // 'img/logo.png' — vazio mostra as iniciais
  whatsapp: '5511999999999',   // 55 + DDD + número, só dígitos
  instagram: '',               // sem @, ou deixe vazio
  endereco: '',
  horario: 'Seg a Sáb, 9h às 18h',
  cor: '#c2410c',              // cor da marca
};
```

> O número é o ponto mais importante: **55** (Brasil) + DDD + número, sem
> espaços, parênteses ou traços. `(11) 98765-4321` vira `5511987654321`.

A **logo** aparece redonda no topo. Use uma imagem quadrada (ex.: 200x200) para
não distorcer. Sem logo, o site mostra um círculo com as iniciais do nome.

### 2. Sobre a empresa

```js
export const SOBRE = {
  titulo: 'Sobre a empresa',
  paragrafos: [
    'Primeiro parágrafo...',
    'Segundo parágrafo...',
  ],
  numeros: [                       // deixe [] para não mostrar
    { valor: '+10', rotulo: 'anos de experiência' },
  ],
};
```

### 3. Eventos

Aparecem na página inicial. A data é texto livre — pode ser `'15 de março'`,
`'Todo sábado'` ou `'Sob agendamento'`:

```js
{
  nome: 'Feira de Verão',
  data: '15 e 16 de março',
  local: 'Praça Central',
  descricao: 'Dois dias de exposição com preços especiais.',
  destaque: true,      // opcional, mostra a etiqueta
  encerrado: false,    // true apaga o card e tira o botão
  foto: '',            // opcional
},
```

> Evento que passou: em vez de apagar, marque `encerrado: true`. O card fica
> esmaecido, sem botão — mostra movimento da empresa sem gerar contato inútil.

### 4. Loja

O quarto bloco da página inicial. Cada item é um cartão que leva o visitante
para **fora** do site — loja online ou o endereço no mapa:

```js
export const LOJAS = [
  {
    nome: 'Loja online',
    tipo: 'online',                          // 'online' (carrinho) ou 'fisica' (mapa)
    url: 'https://shopee.com.br/sualoja',    // obrigatório
    descricao: 'Compre pelo site com entrega para todo o Brasil.',
    botao: 'Comprar online',
  },
  {
    nome: 'Loja física',
    tipo: 'fisica',
    url: 'https://maps.google.com/?q=Rua+Exemplo+123',
    descricao: 'Venha conhecer nosso espaço.',
    botao: 'Ver no mapa',
  },
];
```

Serve para qualquer destino: Shopee, Mercado Livre, Elo7, loja virtual própria,
iFood ou Google Maps. Só troque a `url`.

Para o link do mapa: abra o Google Maps, busque o endereço, clique em
**Compartilhar** e depois em **Copiar link**, e cole em `url`.

Os cartões abrem em **outra aba**, para o visitante não perder o site. Deixe a
lista vazia `[]` e o bloco inteiro desaparece.

### 5. Produtos

Copie um bloco inteiro para criar outro produto:

```js
{
  nome: 'Camiseta Básica Preta',
  preco: 79.9,                 // use 0 para mostrar "Sob consulta"
  categoria: 'Camisetas',      // vira filtro no topo
  descricao: 'Algodão penteado, modelagem reta.',
  codigo: 'CAM-001',           // opcional, vai na mensagem
  destaque: true,              // opcional, mostra a etiqueta
  foto: 'img/camiseta.jpg',    // opcional
},
```

As categorias aparecem sozinhas nos filtros — basta usar o nome que quiser.

### 6. Fotos

Coloque os arquivos na pasta `img/` e aponte no produto ou evento:

```js
foto: 'img/camiseta-preta.jpg',
```

Sem foto, o item mostra um bloco colorido com a inicial do nome. A cor é
derivada do próprio nome, então cada um mantém sempre a mesma.

> Redimensione as imagens para no máximo ~800px de largura antes de subir.
> Foto de celular tem vários MB e deixa o site lento em conexão móvel — que é
> justamente como a maioria vai acessar.

### 7. As mensagens do WhatsApp

No fim do `config.js` há três: `MENSAGEM` (produto), `MENSAGEM_EVENTO` e
`MENSAGEM_GERAL` (botões de contato do topo e do rodapé).

```js
export const MENSAGEM = (produto, precoFormatado) =>
  `Olá! Vi o site e tenho interesse neste produto:\n\n` +
  `*${produto.nome}*\n` +
  `${precoFormatado}\n` +
  `\nPoderia me passar mais informações?`;
```

`\n` quebra a linha e `*texto*` fica em **negrito** no WhatsApp.

## Ver o site na sua máquina

Não abra o `index.html` com dois cliques: o navegador bloqueia módulos
JavaScript em arquivos locais (`file://`) e a página fica em branco. Sirva por
HTTP a partir desta pasta:

```powershell
npx --yes serve .
# ou, se tiver Python:  python -m http.server 4000
```

Depois acesse o endereço que aparecer (algo como `http://localhost:3000`).

## Publicar no GitHub Pages

1. Crie um repositório **público** (o Pages a partir de repositório privado
   exige plano pago).
2. Envie estes arquivos.
3. No repositório: **Settings**, **Pages**, **Source: Deploy from a branch**,
   branch `main`, pasta `/(root)`.
4. Em um ou dois minutos o site fica no ar em
   `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

Para usar domínio próprio (ex.: `www.lojadocliente.com.br`), vá em
**Settings**, **Pages**, **Custom domain**, apontando o DNS do domínio para o
GitHub.

## Estrutura

```
vitrine/
├── index.html          pagina inicial (capa, sobre, eventos, loja)
├── produtos.html       catalogo
├── css/estilo.css      aparencia
└── js/
    ├── config.js       >>> TODO O CONTEUDO ESTA AQUI <<<
    ├── comum.js        topo, rodape e pecas compartilhadas
    ├── home.js         monta a pagina inicial
    └── produtos.js     monta o catalogo
```

## O que este site não faz

Não tem carrinho, pagamento nem controle de estoque — o pedido é fechado na
conversa do WhatsApp ou na loja externa. É proposital: nada para o cliente
manter, nenhuma mensalidade, e o dono do negócio atende no lugar onde já atende.
