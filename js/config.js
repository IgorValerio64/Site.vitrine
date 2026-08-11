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
  nome: 'GunsCore',
  slogan: '',

  // Logo do topo. Coloque o arquivo em img/ e escreva 'img/logo.png'.
  // Deixando vazio (ou se o arquivo faltar), aparece um círculo com as iniciais.
  logo: 'img/logo.png',

  // Imagem grande da capa (banner no topo da página inicial). Vazio = o topo
  // fica transparente e mostra o FUNDO da página. Deixamos vazio porque o
  // fundo da GSC agora cobre o site inteiro.
  capa: '',

  // Imagem de FUNDO fixa atrás do site inteiro. Coloque em img/ e aponte aqui.
  // Vazio = sem imagem de fundo (fica só a cor escura).
  fundo: 'img/fundo.jpg',

  // Iniciais usadas quando não há logo. Vazio deixa o site derivar do nome.
  iniciais: 'GC',

  // Número com código do país (55) + DDD + número, só dígitos.
  // Ex.: (11) 98765-4321  ->  5511987654321
  whatsapp: '5519999360080',   // (19) 99936-0080

  // Opcionais: deixe '' para não aparecer.
  instagram: '',            // só o usuário, sem @  (ex.: 'nomedaloja')
  endereco: 'Av. Dr. Paulo de Moraes, 2173 - Paulista, Piracicaba - SP, 13400-890',
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
    url: 'https://www.google.com/maps/search/?api=1&query=Av.%20Dr.%20Paulo%20de%20Moraes%2C%202173%20-%20Paulista%2C%20Piracicaba%20-%20SP%2C%2013400-890',
    descricao: 'Av. Dr. Paulo de Moraes, 2173 - Paulista, Piracicaba - SP. Venha nos visitar.',
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
// O campo `specs` (opcional) aparece na FICHA do produto (ao clicar no card).
// É um objeto { 'Rótulo': 'Valor' } — a ordem é mantida. As specs abaixo são
// EXEMPLO/representativas (categorias genéricas); troque pelos números reais
// dos modelos que você vender.
export const PRODUTOS = [
  {
    nome: 'Pistola calibre .380',
    preco: 0,
    categoria: 'Armas',
    descricao: 'Consulte modelos disponíveis. Venda mediante documentação.',
    descLonga: 'Pistola semiautomática em calibre .380 ACP, voltada para defesa pessoal e '
      + 'porte. Estrutura em polímero e ferrolho em aço, boa capacidade de munição e manejo '
      + 'confortável. Consulte os modelos disponíveis em estoque — a venda é feita mediante '
      + 'a documentação exigida por lei.',
    codigo: 'ARM-001',
    destaque: true,
    specs: {
      'Calibre': '.380 ACP',
      'Capacidade': '15 + 1 tiros',
      'Ação': 'Dupla ação (DA/SA)',
      'Comprimento do cano': '≈ 4" (100 mm)',
      'Sistema': 'Semiautomática',
      'Material': 'Polímero e aço',
    },
  },
  {
    nome: 'Revólver calibre .38',
    preco: 0,
    categoria: 'Armas',
    descricao: 'Consulte modelos disponíveis. Venda mediante documentação.',
    descLonga: 'Revólver calibre .38 SPL, opção clássica e confiável para defesa. Ação dupla, '
      + 'construção robusta em aço e disponível em diferentes comprimentos de cano. Consulte '
      + 'os modelos em estoque — venda mediante documentação.',
    codigo: 'ARM-002',
    specs: {
      'Calibre': '.38 SPL',
      'Capacidade': '5 a 6 tiros',
      'Ação': 'Dupla ação',
      'Comprimento do cano': '2" a 4"',
      'Material': 'Aço carbono / inox',
      'Miras': 'Fixas',
    },
  },
  {
    nome: 'Carabina de pressão',
    preco: 0,
    categoria: 'Armas',
    descricao: 'Modelos para prática esportiva.',
    descLonga: 'Carabina de pressão para tiro esportivo e prática de pontaria, com propulsão '
      + 'por ar comprimido. Boa opção para treino sem a burocracia das armas de fogo. Consulte '
      + 'calibres e modelos disponíveis.',
    codigo: 'ARM-003',
    specs: {
      'Calibre': '4,5 mm (.177) / 5,5 mm (.22)',
      'Propulsão': 'Ar comprimido (mola / gás ram)',
      'Velocidade': 'até ≈ 305 m/s',
      'Uso': 'Tiro esportivo / prática',
      'Coronha': 'Polímero ou madeira',
    },
  },
  {
    nome: 'Munição .380 ACP',
    preco: 0,
    categoria: 'Munições',
    descricao: 'Caixa com 50 unidades. Venda controlada.',
    codigo: 'MUN-001',
    destaque: true,
    specs: {
      'Calibre': '.380 Auto (9×17 mm)',
      'Projétil': 'FMJ / EPR',
      'Peso do projétil': '≈ 95 gr',
      'Embalagem': 'Caixa com 50',
      'Uso': 'Pistola',
    },
  },
  {
    nome: 'Munição .38 SPL',
    preco: 0,
    categoria: 'Munições',
    descricao: 'Caixa com 50 unidades. Venda controlada.',
    codigo: 'MUN-002',
    specs: {
      'Calibre': '.38 Special',
      'Projétil': 'FMJ / SJHP',
      'Peso do projétil': '≈ 158 gr',
      'Embalagem': 'Caixa com 50',
      'Uso': 'Revólver',
    },
  },
  {
    nome: 'Coldre de cintura',
    preco: 249.9,
    categoria: 'Acessórios',
    descricao: 'Kydex, ajuste de retenção. Consulte o modelo compatível.',
    codigo: 'ACE-001',
    specs: {
      'Material': 'Kydex',
      'Porte': 'IWB (interno) / OWB (externo)',
      'Retenção': 'Ajustável',
      'Mão': 'Destro / canhoto',
      'Compatibilidade': 'Conforme o modelo da arma',
    },
  },
  {
    nome: 'Protetor auricular',
    preco: 129.9,
    categoria: 'Acessórios',
    descricao: 'Abafador tipo concha para uso em estande.',
    codigo: 'ACE-002',
    specs: {
      'Tipo': 'Abafador tipo concha (passivo)',
      'Atenuação (NRR)': '≈ 26 dB',
      'Ajuste': 'Haste regulável',
      'Uso': 'Estande / campo',
    },
  },
  {
    nome: 'Cofre para arma',
    preco: 899.9,
    categoria: 'Acessórios',
    descricao: 'Armazenamento seguro, com fechadura eletrônica.',
    codigo: 'ACE-003',
    destaque: true,
    specs: {
      'Fechadura': 'Eletrônica + chave de emergência',
      'Material': 'Aço',
      'Capacidade': '1 a 2 armas curtas',
      'Fixação': 'Furos para parede/móvel',
      'Interior': 'Revestido',
    },
  },
  {
    nome: 'Kit de limpeza',
    preco: 189.9,
    categoria: 'Manutenção',
    descricao: 'Hastes, escovas, flanelas e óleo lubrificante.',
    codigo: 'MAN-001',
    specs: {
      'Itens': 'Hastes, escovas, flanelas e óleo',
      'Compatibilidade': 'Multicalibre',
      'Uso': 'Manutenção geral',
    },
  },
];

// =====================================================================
//  ABAS "DOCUMENTAÇÃO E ENVIO" e "PERGUNTAS FREQUENTES" da ficha do produto.
//  É o MESMO conteúdo para todos os produtos.
//
//  >>> IMPORTANTE: confirme estes textos com o responsável legal da GunsCore
//  >>> e preencha os dados reais (CNPJ, credenciamento). São um rascunho.
// =====================================================================

export const DOC_ENVIO = [
  {
    titulo: 'Documentação necessária',
    texto: 'Armas de fogo e munições são Produtos Controlados pelo Exército (PCE). '
      + 'A aquisição exige Certificado de Registro (CR) ativo ou autorização de compra '
      + 'da Polícia Federal (SINARM), conforme a sua categoria e a legislação vigente. '
      + 'Acessórios não controlados (coldres, protetores, etc.) não exigem documentação.',
  },
  {
    titulo: 'Como funciona a compra',
    texto: 'O site é uma vitrine: a reserva do produto é feita pelo WhatsApp. O faturamento '
      + 'e o envio acontecem somente após a validação da sua documentação e a emissão dos '
      + 'registros exigidos (como CRAF e guia de tráfego), quando for o caso.',
  },
  {
    titulo: 'Envio',
    texto: 'O despacho de produtos controlados é feito por transportadora homologada, com '
      + 'rastreio, sempre conforme as normas do Exército Brasileiro. Itens não controlados '
      + 'seguem por envio comum. Prazos e valores são confirmados no atendimento.',
  },
  {
    titulo: 'Suporte',
    texto: 'Nossa equipe acompanha a conferência da documentação pra agilizar a entrega. '
      + 'Ficou em dúvida sobre o seu enquadramento? Fale com a gente antes de fechar.',
  },
];

export const FAQ = [
  {
    pergunta: 'Preciso de CR para comprar?',
    resposta: 'Para armas e munições, sim — CR ativo ou autorização de compra da Polícia '
      + 'Federal, conforme a sua categoria. Acessórios não exigem documentação.',
  },
  {
    pergunta: 'Dá pra comprar direto pelo site?',
    resposta: 'A negociação e a reserva são feitas pelo WhatsApp. A venda de itens controlados '
      + 'segue todo o processo legal exigido antes do envio.',
  },
  {
    pergunta: 'Qual a idade mínima?',
    resposta: 'A aquisição de arma de fogo é permitida a maiores de 25 anos, habilitados e '
      + 'com a documentação em dia.',
  },
  {
    pergunta: 'Como recebo o produto?',
    resposta: 'Depois da validação da documentação, o envio é feito por transportadora '
      + 'homologada, com código de rastreio.',
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
