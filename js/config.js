// =====================================================================
//  É AQUI QUE VOCÊ EDITA O SITE.
//
//  Todo o conteúdo (empresa, texto institucional, eventos e produtos)
//  fica neste arquivo. Os outros arquivos você não precisa abrir.
// =====================================================================

export const NEGOCIO = {
  // >>> IDENTIDADE REMOVIDA ENQUANTO O SITE ESTA PUBLICO COM DADOS DE
  // >>> EXEMPLO. Para devolver: preencha `nome`, coloque o arquivo da marca
  // >>> em img/ e aponte em `logo`, e ajuste `iniciais` se a assinatura da
  // >>> marca for diferente das iniciais do nome.
  nome: 'Nome da Empresa',
  slogan: '',

  // Logo do topo. Coloque o arquivo em img/ e escreva 'img/logo.png'.
  // Deixando vazio (ou se o arquivo faltar), aparece um círculo com as iniciais.
  logo: '',

  // Imagem grande da capa (banner no topo da página inicial). Coloque o
  // arquivo em img/ e aponte aqui. Vazio = mostra o nome em texto grande.
  capa: 'img/capa.jpg',

  // Iniciais usadas quando não há logo. Vazio deixa o site derivar do nome.
  iniciais: '',

  // Número com código do país (55) + DDD + número, só dígitos.
  // Ex.: (11) 98765-4321  ->  5511987654321
  whatsapp: '5511999999999',   // <<< TROCAR PELO NÚMERO REAL

  // Opcionais: deixe '' para não aparecer.
  instagram: '',            // só o usuário, sem @  (ex.: 'nomedaloja')
  endereco: '',             // ex.: 'Rua das Flores, 123 - Centro'
  horario: 'Seg a Sex, 9h às 18h · Sáb, 9h às 13h',

  // Registro no Exército. Aparece no rodapé — dá credibilidade e é
  // exigência de transparência no setor. Deixe '' se preferir não mostrar.
  registro: '',             // ex.: 'CR nº 000000 - Exército Brasileiro'

  // Cor principal do site — laranja extraído da própria logo.
  cor: '#e15b12',

  // 'escuro' combina com a marca; 'claro' deixa o site em tons de areia.
  tema: 'escuro',
};

// =====================================================================
//  AVISO LEGAL — aparece no rodapé de todas as páginas.
//
//  Comércio de armas e munições é regulamentado. O site é uma VITRINE:
//  não vende, não processa pagamento e não substitui o processo legal de
//  aquisição. Deixar isso explícito protege a loja e evita que o visitante
//  chegue ao WhatsApp achando que basta pagar.
//
//  Confirme o texto com o responsável legal da empresa antes de publicar.
// =====================================================================

export const AVISO_LEGAL =
  'Este site tem caráter exclusivamente informativo e não realiza vendas online. '
  + 'A comercialização de armas de fogo, munições e acessórios controlados é '
  + 'regulamentada pelo Exército Brasileiro e destinada apenas a pessoas maiores '
  + 'de 25 anos, devidamente habilitadas e com documentação e autorizações válidas. '
  + 'Toda aquisição está sujeita à apresentação da documentação exigida por lei e '
  + 'à autorização dos órgãos competentes.';

// =====================================================================
//  SOBRE A EMPRESA — o bloco do meio da página inicial.
//  Cada item do array vira um parágrafo.
// =====================================================================

export const SOBRE = {
  titulo: 'Sobre a empresa',
  paragrafos: [
    'Loja especializada em armas de fogo, munições e acessórios, com '
    + 'atendimento voltado a CACs, agentes de segurança e cidadãos '
    + 'habilitados. Trabalhamos com produtos de procedência comprovada e '
    + 'orientação técnica em cada etapa.',

    'Nossa equipe acompanha o cliente desde a escolha do equipamento até a '
    + 'documentação necessária para a aquisição. Fale com a gente pelo '
    + 'WhatsApp para tirar dúvidas ou solicitar um orçamento.',
  ],

  // Números de destaque. Deixe a lista vazia [] para não mostrar.
  numeros: [
    { valor: '+10',  rotulo: 'anos de experiência' },
    { valor: '+500', rotulo: 'clientes atendidos' },
    { valor: '100%', rotulo: 'produtos com procedência' },
  ],
};

// =====================================================================
//  SERVIÇOS / ASSESSORIA — bloco na página inicial.
//
//  Destaca que a loja ajuda o cliente a tirar e manter os registros.
//  Cada item vira um cartão com um botão que abre o WhatsApp.
//  Confira os nomes/siglas com o responsável antes de publicar.
// =====================================================================

export const SERVICOS = {
  titulo: 'Assessoria e documentação',
  subtitulo: 'A gente tira e mantém seus registros em dia — orientação do começo ao fim, '
    + 'sem você se perder na burocracia. Fale com a gente pelo WhatsApp.',
  itens: [
    {
      nome: 'Posse de arma',
      descricao: 'Registro para manter a arma na sua residência ou local de trabalho. '
        + 'Cuidamos da documentação junto à Polícia Federal.',
    },
    {
      nome: 'Porte de arma',
      descricao: 'Autorização para portar a arma, conforme a sua categoria e os '
        + 'requisitos exigidos por lei.',
    },
    {
      nome: 'CAC — Tiro esportivo',
      descricao: 'Registro de Colecionador, Atirador e Caçador (CAC) junto ao Exército, '
        + 'com a documentação de cada modalidade.',
    },
    {
      nome: 'Renovação e transferência',
      descricao: 'Renovações, transferências, guias de tráfego e emissão de certificados. '
        + 'Acompanhamos cada etapa do processo.',
    },
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
    nome: 'Curso de Tiro Defensivo',
    data: '15 e 16 de março',
    local: 'Clube de Tiro parceiro',
    descricao: 'Treinamento prático com instrutor credenciado. Turmas reduzidas.',
    destaque: true,
  },
  {
    nome: 'Dia de Prova de Armas',
    data: 'Todo último sábado do mês',
    local: 'Estande parceiro',
    descricao: 'Experimente diferentes modelos antes de decidir a compra.',
  },
  {
    nome: 'Assessoria para CAC',
    data: 'Sob agendamento',
    local: 'Na loja',
    descricao: 'Orientação completa sobre registro, documentação e renovação.',
  },
];

// =====================================================================
//  LOJA — o quarto bloco da página inicial.
//
//  Cada item vira um cartão que leva o visitante para fora do site.
//
//    nome       obrigatório
//    tipo       'online' (ícone de loja) ou 'fisica' (ícone de mapa)
//    url        para onde o clique leva. OBRIGATÓRIO
//                 a própria vitrine: 'produtos.html'
//                 perfil ou loja externa: 'https://instagram.com/sualoja'
//                 endereço: link do Google Maps
//    descricao  opcional
//    botao      texto do botão (opcional). Sem isso, o site usa
//               'Ver a vitrine' ou 'Ver no mapa', conforme o tipo.
//
//  Endereços que começam com http:// ou https:// abrem em OUTRA aba.
//  Páginas do próprio site (como 'produtos.html') abrem na MESMA aba.
//
//  ATENÇÃO AO TEXTO DO BOTÃO: escreva o que o clique realmente faz.
//  "Comprar online" só vale se existir carrinho e pagamento do outro lado.
//  Se o pedido é fechado no WhatsApp, prefira algo como:
//    'Ver a vitrine' · 'Ver o catálogo' · 'Conhecer a loja'
//    'Ver no Instagram' · 'Ver no mapa'
//
//  Deixe a lista vazia [] para o bloco não aparecer.
// =====================================================================

export const SECAO_LOJA = {
  titulo: 'Onde nos encontrar',
  subtitulo: 'Veja a vitrine e fale com a gente pelo WhatsApp.',
};

export const LOJAS = [
  {
    nome: 'Nossa vitrine',
    tipo: 'online',
    url: 'produtos.html',
    descricao: 'Catálogo completo. Escolha o item e solicite informações pelo WhatsApp.',
    botao: 'Ver a vitrine',
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

// Exemplos genéricos, só para o cliente ver o site montado. Substitua pelo
// catálogo real. Em itens controlados, `preco: 0` mostra "Sob consulta" —
// costuma ser a escolha mais segura, já que o valor depende de documentação,
// tributos e disponibilidade.
export const PRODUTOS = [
  {
    nome: 'Pistola calibre .380',
    preco: 0,
    categoria: 'Armas',
    descricao: 'Consulte modelos disponíveis. Venda mediante documentação.',
    codigo: 'ARM-001',
    destaque: true,
  },
  {
    nome: 'Revólver calibre .38',
    preco: 0,
    categoria: 'Armas',
    descricao: 'Consulte modelos disponíveis. Venda mediante documentação.',
    codigo: 'ARM-002',
  },
  {
    nome: 'Carabina de pressão',
    preco: 0,
    categoria: 'Armas',
    descricao: 'Modelos para prática esportiva.',
    codigo: 'ARM-003',
  },
  {
    nome: 'Munição .380 ACP',
    preco: 0,
    categoria: 'Munições',
    descricao: 'Caixa com 50 unidades. Venda controlada.',
    codigo: 'MUN-001',
    destaque: true,
  },
  {
    nome: 'Munição .38 SPL',
    preco: 0,
    categoria: 'Munições',
    descricao: 'Caixa com 50 unidades. Venda controlada.',
    codigo: 'MUN-002',
  },
  {
    nome: 'Coldre de cintura',
    preco: 249.9,
    categoria: 'Acessórios',
    descricao: 'Kydex, ajuste de retenção. Consulte o modelo compatível.',
    codigo: 'ACE-001',
  },
  {
    nome: 'Protetor auricular',
    preco: 129.9,
    categoria: 'Acessórios',
    descricao: 'Abafador tipo concha para uso em estande.',
    codigo: 'ACE-002',
  },
  {
    nome: 'Cofre para arma',
    preco: 899.9,
    categoria: 'Acessórios',
    descricao: 'Armazenamento seguro, com fechadura eletrônica.',
    codigo: 'ACE-003',
    destaque: true,
  },
  {
    nome: 'Kit de limpeza',
    preco: 189.9,
    categoria: 'Manutenção',
    descricao: 'Hastes, escovas, flanelas e óleo lubrificante.',
    codigo: 'MAN-001',
  },
];

// =====================================================================
//  MENSAGENS DO WHATSAPP
//  \n quebra a linha e *texto* aparece em negrito no WhatsApp.
// =====================================================================

// "Informações" em vez de "quero comprar": a aquisição depende de
// documentação e autorização, então a conversa começa como consulta.
export const MENSAGEM = (produto, precoFormatado) =>
  `Olá! Vi o site e gostaria de informações sobre este item:\n\n`
  + `*${produto.nome}*\n`
  + `${precoFormatado}\n`
  + (produto.codigo ? `Código: ${produto.codigo}\n` : '')
  + `\nPodem me orientar sobre disponibilidade e documentação necessária?`;

export const MENSAGEM_EVENTO = (evento) =>
  `Olá! Vi o site e quero saber mais sobre:\n\n`
  + `*${evento.nome}*\n`
  + (evento.data ? `${evento.data}\n` : '')
  + (evento.local ? `${evento.local}\n` : '')
  + `\nComo faço para participar?`;

export const MENSAGEM_SERVICO = (servico) =>
  `Olá! Vi o site e quero saber mais sobre o serviço de:\n\n`
  + `*${servico.nome}*\n`
  + `\nComo funciona e o que eu preciso?`;

export const MENSAGEM_GERAL = () =>
  `Olá! Vi o site e gostaria de mais informações.`;
