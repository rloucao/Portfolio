const pt = {
  meta: {
    title: "Rodrigo Loução — Programador Full-stack",
    description:
      "Programador full-stack em Lisboa. Desenvolvo aplicações web, aplicações móveis e infraestrutura cloud. Disponível para projetos freelance.",
  },
  langSwitch: "Mudar de língua",
  status: "Disponível para freelance",
  nav: {
    work: "Trabalho",
    about: "Sobre",
    process: "Processo",
    contact: "Contacto",
    cta: "Falar comigo",
  },
  hero: {
    eyebrow: "Programador full-stack · Lisboa",
    title: "Desenvolvo para a web, para mobile e para a infraestrutura por trás de tudo.",
    lede: "Já pus em produção sistemas de reservas, plataformas de encomendas e sites multilingues para negócios reais, e estou a terminar o mestrado na NOVA FCT, focado em cloud computing e sistemas confiáveis.",
    primary: "Falar comigo",
    secondary: "Ver trabalho",
    photoAlt: "Retrato de Rodrigo Loução",
    photoOpen: "Ver foto",
    photoClose: "Fechar foto",
  },
  work: {
    eyebrow: "Trabalho selecionado",
    title: "Projetos que construí, do primeiro esboço até à produção.",
    built: "O que construí",
    stack: "Tecnologias",
    visit: "Ver site",
    testing: "Em testes",
    projects: {
      messenger: {
        title: "Hoppin",
        tag: "Mobile App · Sistemas distribuídos",
        summary:
          "Uma aplicação de mensagens peer-to-peer que estou a construir de raiz. Está em fase de testes, e o caso de estudo completo fica aqui quando for lançada.",
        points: [],
      },
      mbd: {
        tag: "Site · Hotelaria",
        summary:
          "Um site editorial para um restaurante, um hotel de 14 quartos e casas de aluguer na costa alentejana. É o único ponto de contacto digital do negócio.",
        points: [
          "Animações guiadas pelo scroll com GSAP e Lenis",
          "Conteúdo em quatro línguas: português, inglês, alemão e italiano",
          "Galerias com lightbox para cada propriedade",
          "Formulários de reserva e de orçamento para eventos com Next.js Server Actions e proteção contra spam",
        ],
      },
      gda: {
        tag: "App web · Restauração",
        summary: "Um site e sistema de gestão para um restaurante de praia.",
        points: [
          "Site público com o menu e reservas de mesa",
          "Encomendas a partir da espreguiçadeira, diretamente da praia",
          "Painel de administração para reservas, finanças e operação diária",
        ],
      },
      b130: {
        tag: "App web · Marcações",
        summary: "Um sistema de marcações e gestão para uma barbearia.",
        points: [
          "Marcações online rápidas",
          "Painel de administração com equipa, relatórios financeiros e agenda em tempo real",
          "Controlo de acessos por funções",
          "Notificações automáticas por mensagem",
        ],
      },
    },
  },
  experience: {
    eyebrow: "Percurso",
    title: "Onde estudei e trabalhei.",
    workLabel: "Experiência",
    eduLabel: "Formação",
    jobs: [
      {
        role: "Programador Full-stack Freelancer",
        org: "Trabalho independente",
        period: "2026 — presente",
        text: "Desenho e desenvolvo aplicações web full-stack para empresas, com Next.js, Tailwind CSS, Supabase e Stripe.",
      },
      {
        role: "Programador Full-stack",
        org: "Innova Junior Consulting",
        period: "2024 — 2025",
        text: "Desenvolvi aplicações web numa equipa de quatro programadores, com Java, Spring Boot e React.",
      },
    ],
    education: [
      {
        degree: "Mestrado em Engenharia Informática",
        org: "NOVA FCT · Cloud computing e sistemas confiáveis",
        period: "2025 — set. 2027",
      },
      {
        degree: "Licenciatura em Engenharia Informática",
        org: "NOVA FCT",
        period: "2021 — 2025",
      },
    ],
  },
  about: {
    eyebrow: "Sobre mim",
    scrub:
      "Treino para triatlos Ironman. A mentalidade que nos leva ao fim de um treino longo é a mesma que resolve um problema difícil: paciência, consistência e não parar antes de estar feito.",
    body: [
      "Não comecei com um plano, comecei com curiosidade. Quando entrei na faculdade nunca tinha escrito uma linha de código; só queria perceber como as coisas funcionavam. Essa curiosidade tornou-se um hábito, e o hábito tornou-se um ofício.",
      "Desde então construí sites e sistemas de gestão para negócios locais e uma aplicação de mensagens peer-to-peer, e aprofundei sistemas distribuídos e edge computing. Longe do ecrã, faço trilhos de BTT.",
    ],
    skillsTitle: "Ferramentas",
    skills: [
      { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Swift"] },
      { group: "Backend", items: ["Node.js", "Java · Spring Boot", "PostgreSQL", "Prisma", "Supabase", "MongoDB", "Java", "Kotlin"] },
      { group: "Mobile", items: ["Flutter", "Dart", "Firebase", "Swift"] },
      { group: "Infraestrutura", items: ["Docker", "Kubernetes", "Git"] },
    ],
    strava: "Acompanhe os meus treinos no Strava",
  },
  process: {
    eyebrow: "Trabalhar comigo",
    title: "Como corre um projeto freelance.",
    lede: "Quatro passos, sempre os mesmos, para saber sempre o que vem a seguir.",
    steps: [
      {
        title: "Descoberta",
        text: "Conversamos sobre como o seu negócio funciona na prática: quem são os clientes, o que lhe ocupa o tempo e o que o site tem de fazer.",
      },
      {
        title: "Design",
        text: "Desenho as páginas e só passo ao código depois de as aprovar.",
      },
      {
        title: "Desenvolvimento",
        text: "Construo tudo de ponta a ponta: front end, back end, base de dados, ferramentas de administração e integrações como pagamentos ou email.",
      },
      {
        title: "Lançamento e suporte",
        text: "Publico o site, ligo o seu domínio e continuo disponível para corrigir problemas e fazer alterações depois do lançamento.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Tem um projeto em mente?",
    lede: "Envie-me uma mensagem aqui, ou escreva-me diretamente por email.",
    name: "Nome",
    email: "Email",
    message: "Mensagem",
    namePh: "O seu nome",
    emailPh: "nome@exemplo.com",
    messagePh: "Em que está a trabalhar?",
    send: "Enviar mensagem",
    sending: "A enviar…",
    sent: "Mensagem enviada. Respondo em breve.",
    verify: "Conclua primeiro a verificação.",
    failed: "A mensagem não foi enviada. Tente novamente ou envie-me um email.",
    emailLabel: "Email",
    locationLabel: "Onde estou",
    location: "Lisboa, Portugal",
    elsewhere: "Noutros sítios",
  },
  footer: {
    title: "Vamos construir algo.",
    back: "Voltar ao topo",
  },
};

export default pt;
