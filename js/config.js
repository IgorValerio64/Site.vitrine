// =====================================================================
//  É AQUI QUE VOCÊ EDITA O SITE.
//
//  Todo o conteúdo (empresa, texto institucional, eventos e produtos)
//  fica neste arquivo. Os outros arquivos você não precisa abrir.
// =====================================================================

export const NEGOCIO = {
  nome: 'Loja Exemplo',
  slogan: 'Produtos selecionados e eventos sob medida',

  // Logo redonda do topo. Coloque o arquivo em img/ e escreva 'img/logo.png'.
  // Deixando vazio, aparece um círculo com as iniciais do nome.
  logo: '',

  // Número com código do país (55) + DDD + número, só dígitos.
  // Ex.: (11) 98765-4321  ->  5511987654321
  whatsapp: '5511999999999',

  // Opcionais: deixe '' para não aparecer.
  instagram: '',            // só o usuário, sem @  (ex.: 'lojaexemplo')
  endereco: '',             // ex.: 'Rua das Flores, 123 - Centro'
  horario: 'Seg a Sáb, 9h às 18h',

  // Cor principal do site. Troque para combinar com a marca do cliente.
  cor: '#c2410c',
};

// =====================================================================
//  SOBRE A EMPRESA — o bloco do meio da página inicial.
//  Cada item do array vira um parágrafo.
// =====================================================================

export const SOBRE = {
  titulo: 'Sobre a empresa',
  paragrafos: [
    'Somos uma empresa dedicada a oferecer produtos de qualidade e a criar '
    + 'experiências memoráveis. Trabalhamos com atenção ao detalhe e atendimento '
    + 'próximo, do primeiro contato à entrega.',

    'Além do catálogo, realizamos eventos e ações especiais ao longo do ano. '
    + 'Acompanhe a agenda abaixo e fale com a gente pelo WhatsApp para participar '
    + 'ou reservar uma data.',
  ],

  // Números de destaque. Deixe a lista vazia [] para não mostrar.
  numeros: [
    { valor: '+10',  rotulo: 'anos de experiência' },
    { valor: '+500', rotulo: 'clientes atendidos' },
    { valor: '+30',  rotulo: 'eventos realizados' },
  ],
};

// =====================================================================
//  EVENTOS — aparecem na página inicial.
//
//    nome       obrigatório
//    data       texto livre: '15 de março', 'Todo sábado', 'Sob agendamento'
//    local      opcional
//    descricao  opcional
//    foto       opcional. 'img/evento.jpg'. Sem foto, vira bloco colorido
//    destaque   opcional. true mostra a etiqueta
//    encerrado  opcional. true deixa o card apagado e sem botão
// =====================================================================

export const EVENTOS = [
  {
    nome: 'Feira de Verão',
    data: '15 e 16 de março',
    local: 'Praça Central',
    descricao: 'Dois dias de exposição com preços especiais e atrações para toda a família.',
    destaque: true,
  },
  {
    nome: 'Workshop de Personalização',
    data: 'Todo último sábado do mês',
    local: 'Loja física',
    descricao: 'Aprenda a personalizar suas peças com nossa equipe. Vagas limitadas.',
  },
  {
    nome: 'Eventos Corporativos',
    data: 'Sob agendamento',
    local: 'No local do cliente',
    descricao: 'Montamos ações personalizadas para empresas: brindes, uniformes e ativações.',
  },
];

// =====================================================================
//  LOJAS — o quarto bloco da página inicial.
//
//  Cada item vira um cartão que leva o visitante para fora do site.
//
//    nome       obrigatório
//    tipo       'online' (carrinho) ou 'fisica' (mapa). Muda só o ícone
//    url        para onde o clique leva. OBRIGATÓRIO
//                 online: https://shopee.com.br/sualoja
//                 física: link do Google Maps do endereço
//    descricao  opcional
//    botao      texto do botão. Sem isso, usa 'Ir para a loja'
//
//  Deixe a lista vazia [] para o bloco não aparecer.
// =====================================================================

export const LOJAS = [
  {
    nome: 'Loja online',
    tipo: 'online',
    url: 'https://shopee.com.br/',
    descricao: 'Compre pelo site com pagamento seguro e entrega para todo o Brasil.',
    botao: 'Comprar online',
  },
  {
    nome: 'Loja física',
    tipo: 'fisica',
    url: 'https://maps.google.com/?q=Avenida+Paulista+1000+Sao+Paulo',
    descricao: 'Venha conhecer nosso espaço e ver os produtos de perto.',
    botao: 'Ver no mapa',
  },
];

// =====================================================================
//  PRODUTOS — aparecem na página do catálogo.
//
//    nome      obrigatório
//    preco     número. Use 0 para mostrar "Sob consulta"
//    categoria agrupa nos filtros. Crie as que quiser
//    descricao aparece embaixo do nome
//    codigo    opcional, vai junto na mensagem do WhatsApp
//    foto      opcional. 'img/nome.jpg'. Sem foto, vira bloco colorido
//    destaque  opcional. true mostra a etiqueta
// =====================================================================

export const PRODUTOS = [
  {
    nome: 'Camiseta Básica Preta',
    preco: 79.9,
    categoria: 'Camisetas',
    descricao: 'Algodão penteado, modelagem reta. Do P ao GG.',
    codigo: 'CAM-001',
    destaque: true,
  },
  {
    nome: 'Camiseta Estampada Verão',
    preco: 89.9,
    categoria: 'Camisetas',
    descricao: 'Estampa exclusiva, tecido leve.',
    codigo: 'CAM-002',
  },
  {
    nome: 'Camiseta Oversized',
    preco: 99.9,
    categoria: 'Camisetas',
    descricao: 'Caimento solto, ombro caído.',
    codigo: 'CAM-003',
  },
  {
    nome: 'Moletom com Capuz',
    preco: 189.9,
    categoria: 'Moletons',
    descricao: 'Forro felpado, bolso canguru.',
    codigo: 'MOL-001',
    destaque: true,
  },
  {
    nome: 'Moletom Careca',
    preco: 169.9,
    categoria: 'Moletons',
    descricao: 'Sem capuz, punho canelado.',
    codigo: 'MOL-002',
  },
  {
    nome: 'Boné Aba Curva',
    preco: 59.9,
    categoria: 'Acessórios',
    descricao: 'Ajuste traseiro, bordado frontal.',
    codigo: 'ACE-001',
  },
  {
    nome: 'Meia Cano Alto',
    preco: 24.9,
    categoria: 'Acessórios',
    descricao: 'Par. Tamanho único.',
    codigo: 'ACE-002',
  },
  {
    nome: 'Kit 3 Camisetas',
    preco: 199.9,
    categoria: 'Kits',
    descricao: 'Escolha as cores no atendimento.',
    codigo: 'KIT-001',
    destaque: true,
  },
  {
    nome: 'Peça Personalizada',
    preco: 0,
    categoria: 'Kits',
    descricao: 'Estampa sua arte. Orçamento pelo WhatsApp.',
    codigo: 'KIT-002',
  },
];

// =====================================================================
//  MENSAGENS DO WHATSAPP
//  \n quebra a linha e *texto* aparece em negrito no WhatsApp.
// =====================================================================

export const MENSAGEM = (produto, precoFormatado) =>
  `Olá! Vi o site e tenho interesse neste produto:\n\n`
  + `*${produto.nome}*\n`
  + `${precoFormatado}\n`
  + (produto.codigo ? `Código: ${produto.codigo}\n` : '')
  + `\nPoderia me passar mais informações?`;

export const MENSAGEM_EVENTO = (evento) =>
  `Olá! Vi o site e quero saber mais sobre este evento:\n\n`
  + `*${evento.nome}*\n`
  + (evento.data ? `${evento.data}\n` : '')
  + (evento.local ? `${evento.local}\n` : '')
  + `\nComo faço para participar?`;

export const MENSAGEM_GERAL = () =>
  `Olá! Vi o site e gostaria de mais informações.`;
