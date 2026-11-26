import type { SkillCategory } from './skills';

export type Locale = 'pt-BR' | 'en' | 'es';

export interface LocaleOption {
  id: Locale;
  shortLabel: string;
  nativeLabel: string;
  htmlLang: string;
  pageTitle: string;
}

export const LOCALE_OPTIONS: LocaleOption[] = [
  {
    id: 'pt-BR',
    shortLabel: 'PT-BR',
    nativeLabel: 'Português (Brasil)',
    htmlLang: 'pt-BR',
    pageTitle: 'Matt Pocock Skills — Skills for Real Engineers',
  },
  {
    id: 'en',
    shortLabel: 'EN',
    nativeLabel: 'English',
    htmlLang: 'en',
    pageTitle: 'Matt Pocock Skills — Skills for Real Engineers',
  },
  {
    id: 'es',
    shortLabel: 'ES',
    nativeLabel: 'Español',
    htmlLang: 'es',
    pageTitle: 'Matt Pocock Skills — Skills for Real Engineers',
  },
];

export interface LocalizedCategoryMeta {
  id: 'all' | SkillCategory;
  label: string;
  shortLabel: string;
}

export interface UICopy {
  languageSelectorLabel: string;
  nav: {
    ariaLabel: string;
    flow: string;
    router: string;
    catalog: string;
    install: string;
    cta: string;
  };
  hero: {
    headline: string;
    leadPrefix: string;
    leadSuffix: string;
    primaryCta: string;
    githubCta: string;
    quickInstallTitle: string;
    installMethodAria: string;
    copy: string;
    copied: string;
    copyCommandAria: (cmd: string) => string;
    stats: {
      skills: string;
      stages: string;
      categories: string;
    };
  };
  flow: {
    kicker: string;
    heading: string;
    description: string;
    prevStageAria: string;
    nextStageAria: string;
    tablistAria: string;
    stageLabel: (n: number) => string;
    alsoKnownAs: string;
    inspectCta: string;
    copiedCommand: string;
    copyCommand: (cmd: string) => string;
    whatHappensHeading: string;
  };
  router: {
    kicker: string;
    heading: string;
    description: string;
    inputPlaceholder: string;
    inputAria: string;
    clearAria: string;
    frequentScenarios: string;
    noDirectMatchPrefix: string;
    defaultSuggestion: string;
    recommendedTrack: string;
    skillSingular: string;
    skillPlural: string;
    startWith: (cmd: string) => string;
  };
  catalog: {
    kicker: string;
    heading: string;
    description: string;
    showingPrefix: string;
    showingOf: string;
    showingSuffix: string;
    filterTabsAria: string;
    searchPlaceholder: string;
    searchAria: string;
    clearSearchAria: string;
    emptyTitle: string;
    emptyHintPrefix: string;
    emptyHintOr: string;
    emptyHintSuffix: string;
    resetFilters: string;
    card: {
      stagePrefix: string;
      inspectLink: string;
      inspectAria: (cmd: string, title: string) => string;
    };
  };
  install: {
    kicker: string;
    heading: string;
    description: string;
    claudeLabel: string;
    claudeDescription: string;
    npxLabel: string;
    npxDescription: string;
    setupLabel: string;
    setupDescription: string;
    footerTagline: string;
  };
  drawer: {
    closeAria: string;
    close: string;
    stagePrefix: string;
    aliasPrefix: string;
    copyCommand: string;
    whenToUse: string;
    whatAgentDoes: string;
    examplePrompt: string;
    copyPrompt: string;
    promptCopied: string;
    connectedSkills: string;
    viewOnGithub: string;
  };
  categories: Record<SkillCategory, string>;
  categoryTabs: LocalizedCategoryMeta[];
}

export const UI_COPY: Record<Locale, UICopy> = {
  'pt-BR': {
    languageSelectorLabel: 'Selecionar idioma',
    nav: {
      ariaLabel: 'Navegação principal',
      flow: 'Fluxo',
      router: 'Roteador',
      catalog: 'Catálogo',
      install: 'Instalação',
      cta: 'Abrir /ask-matt',
    },
    hero: {
      headline: 'Disciplina de engenharia sênior para seus agentes de código',
      leadPrefix:
        'Um mapa interativo do repositório de Matt Pocock. Explore a espinha Idea-to-Ship, encontre o comando exato com o roteador',
      leadSuffix:
        'e inspecione como cada skill estrutura design, testes e revisão.',
      primaryCta: 'Explorar fluxo Idea-to-Ship',
      githubCta: 'Ver repositório no GitHub',
      quickInstallTitle: 'Instalação rápida',
      installMethodAria: 'Método de instalação',
      copy: 'Copiar',
      copied: 'Copiado',
      copyCommandAria: (cmd) => `Copiar comando ${cmd}`,
      stats: {
        skills: 'skills mapeados',
        stages: 'etapas Idea-to-Ship',
        categories: 'categorias',
      },
    },
    flow: {
      kicker: '01. Fluxo Principal',
      heading: 'A espinha Idea-to-Ship',
      description:
        'Em vez de pedir código direto de uma ideia solta, os 6 skills centrais encadeiam refinamento, especificação, fatiamento, implementação, revisão e entrega.',
      prevStageAria: 'Etapa anterior do fluxo',
      nextStageAria: 'Próxima etapa do fluxo',
      tablistAria: 'Etapas do fluxo Idea-to-Ship',
      stageLabel: (n) => `Etapa 0${n}`,
      alsoKnownAs: 'também',
      inspectCta: 'Ver detalhes e exemplo de prompt',
      copiedCommand: 'Comando copiado',
      copyCommand: (cmd) => `Copiar ${cmd}`,
      whatHappensHeading: 'O que acontece nesta etapa',
    },
    router: {
      kicker: '02. Roteador /ask-matt',
      heading: 'Qual skill usar agora?',
      description:
        'Selecione o cenário que melhor descreve seu bloqueio atual ou digite o que está acontecendo para receber a sequência recomendada.',
      inputPlaceholder: 'Ex: bug em produção, sessão longa, ideia nova...',
      inputAria: 'Descreva seu bloqueio para o roteador /ask-matt',
      clearAria: 'Limpar busca do roteador',
      frequentScenarios: 'Cenários frequentes',
      noDirectMatchPrefix: 'Nenhuma correspondência direta para',
      defaultSuggestion: 'Sugestão padrão',
      recommendedTrack: 'Trilha recomendada',
      skillSingular: 'skill',
      skillPlural: 'skills',
      startWith: (cmd) => `Começar com ${cmd}`,
    },
    catalog: {
      kicker: '03. Catálogo Completo',
      heading: 'Todos os skills do repositório',
      description:
        'Passe o mouse sobre qualquer card para ativar a micro-animação do ícone ou clique para abrir o guia completo com prompt de exemplo.',
      showingPrefix: 'Exibindo',
      showingOf: 'de',
      showingSuffix: 'skills',
      filterTabsAria: 'Filtrar skills por categoria',
      searchPlaceholder: 'Filtrar por comando ou tema...',
      searchAria: 'Filtrar catálogo de skills',
      clearSearchAria: 'Limpar busca do catálogo',
      emptyTitle: 'Nenhum skill encontrado para esta busca',
      emptyHintPrefix: 'Tente outro comando (como',
      emptyHintOr: 'ou',
      emptyHintSuffix: ') ou limpe os filtros ativos.',
      resetFilters: 'Limpar filtros',
      card: {
        stagePrefix: 'Etapa 0',
        inspectLink: 'Ver fluxo e exemplo',
        inspectAria: (cmd, title) => `Inspecionar skill ${cmd} — ${title}`,
      },
    },
    install: {
      kicker: '04. Como Instalar',
      heading: 'Comece em menos de um minuto',
      description:
        'Escolha o plugin oficial para Claude Code ou instale cópias locais editáveis via CLI para Cursor, Copilot e outros agentes compatíveis.',
      claudeLabel: 'Claude Code (Plugin)',
      claudeDescription:
        'Instalação gerenciada diretamente como plugin oficial no Claude Code.',
      npxLabel: 'Cursor, Copilot & Local (npx)',
      npxDescription:
        'Adiciona cópias locais editáveis no seu repositório para qualquer agente compatível.',
      setupLabel: 'Primeiro passo no projeto',
      setupDescription:
        'Calibra pasta de specs, issue tracker e labels de triagem do seu repositório.',
      footerTagline: 'Vitrine interativa baseada no repositório oficial',
    },
    drawer: {
      closeAria: 'Fechar detalhes do skill',
      close: 'Fechar',
      stagePrefix: 'Idea-to-Ship 0',
      aliasPrefix: 'Alias:',
      copyCommand: 'Copiar comando',
      whenToUse: 'Quando usar',
      whatAgentDoes: 'O que o agente executa',
      examplePrompt: 'Exemplo de prompt',
      copyPrompt: 'Copiar prompt',
      promptCopied: 'Prompt copiado',
      connectedSkills: 'Skills conectados no fluxo',
      viewOnGithub: 'Ver no repositório mattpocock/skills',
    },
    categories: {
      'core-flow': 'Fluxo Principal',
      engineering: 'Engenharia & Arquitetura',
      productivity: 'Produtividade & Contexto',
      setup: 'Setup & Roteamento',
    },
    categoryTabs: [
      { id: 'all', label: 'Todos os Skills', shortLabel: 'Todos' },
      { id: 'core-flow', label: 'Fluxo Principal', shortLabel: 'Fluxo Principal' },
      { id: 'engineering', label: 'Engenharia & Arquitetura', shortLabel: 'Engenharia' },
      { id: 'productivity', label: 'Produtividade & Contexto', shortLabel: 'Produtividade' },
      { id: 'setup', label: 'Setup & Roteamento', shortLabel: 'Setup' },
    ],
  },

  en: {
    languageSelectorLabel: 'Select language',
    nav: {
      ariaLabel: 'Primary navigation',
      flow: 'Flow',
      router: 'Router',
      catalog: 'Catalog',
      install: 'Install',
      cta: 'Open /ask-matt',
    },
    hero: {
      headline: 'Senior engineering discipline for your AI coding agents',
      leadPrefix:
        'An interactive map of Matt Pocock’s skills repository. Walk through the Idea-to-Ship spine, pick the right command with the',
      leadSuffix:
        'router, and inspect how each skill structures design, testing, and review.',
      primaryCta: 'Explore Idea-to-Ship flow',
      githubCta: 'View repository on GitHub',
      quickInstallTitle: 'Quick install',
      installMethodAria: 'Installation method',
      copy: 'Copy',
      copied: 'Copied',
      copyCommandAria: (cmd) => `Copy command ${cmd}`,
      stats: {
        skills: 'skills mapped',
        stages: 'Idea-to-Ship stages',
        categories: 'categories',
      },
    },
    flow: {
      kicker: '01. Core Flow',
      heading: 'The Idea-to-Ship spine',
      description:
        'Instead of jumping straight from a loose idea to code, the 6 core skills chain design grilling, formal specs, ticket slicing, implementation, review, and PR delivery.',
      prevStageAria: 'Previous workflow stage',
      nextStageAria: 'Next workflow stage',
      tablistAria: 'Idea-to-Ship workflow stages',
      stageLabel: (n) => `Stage 0${n}`,
      alsoKnownAs: 'also',
      inspectCta: 'View details & prompt example',
      copiedCommand: 'Command copied',
      copyCommand: (cmd) => `Copy ${cmd}`,
      whatHappensHeading: 'What happens at this stage',
    },
    router: {
      kicker: '02. /ask-matt Router',
      heading: 'Which skill should you run now?',
      description:
        'Pick the scenario that matches your current blocker or type what you are facing to get the recommended skill sequence.',
      inputPlaceholder: 'e.g. production bug, long session, new feature idea...',
      inputAria: 'Describe your blocker for the /ask-matt router',
      clearAria: 'Clear router search',
      frequentScenarios: 'Common scenarios',
      noDirectMatchPrefix: 'No direct match for',
      defaultSuggestion: 'Default suggestion',
      recommendedTrack: 'Recommended sequence',
      skillSingular: 'skill',
      skillPlural: 'skills',
      startWith: (cmd) => `Start with ${cmd}`,
    },
    catalog: {
      kicker: '03. Full Catalog',
      heading: 'All repository skills',
      description:
        'Hover any card to trigger its bespoke icon choreography, or click to inspect the full workflow steps and ready-to-use prompt example.',
      showingPrefix: 'Showing',
      showingOf: 'of',
      showingSuffix: 'skills',
      filterTabsAria: 'Filter skills by category',
      searchPlaceholder: 'Filter by command or topic...',
      searchAria: 'Filter skills catalog',
      clearSearchAria: 'Clear catalog search',
      emptyTitle: 'No skills matched your search',
      emptyHintPrefix: 'Try another command (like',
      emptyHintOr: 'or',
      emptyHintSuffix: ') or reset your active filters.',
      resetFilters: 'Reset filters',
      card: {
        stagePrefix: 'Stage 0',
        inspectLink: 'View workflow & example',
        inspectAria: (cmd, title) => `Inspect skill ${cmd} — ${title}`,
      },
    },
    install: {
      kicker: '04. Installation',
      heading: 'Get started in under a minute',
      description:
        'Install the managed plugin for Claude Code or pull editable local copies via CLI for Cursor, Copilot, and other compatible coding agents.',
      claudeLabel: 'Claude Code (Plugin)',
      claudeDescription:
        'Managed installation directly as an official Claude Code plugin.',
      npxLabel: 'Cursor, Copilot & Local (npx)',
      npxDescription:
        'Adds editable local copies to your repository for any compatible AI agent.',
      setupLabel: 'First step in your repo',
      setupDescription:
        'Calibrates your specs folder, issue tracker, and triage labels once.',
      footerTagline: 'Interactive showcase based on the official repository',
    },
    drawer: {
      closeAria: 'Close skill details',
      close: 'Close',
      stagePrefix: 'Idea-to-Ship 0',
      aliasPrefix: 'Alias:',
      copyCommand: 'Copy command',
      whenToUse: 'When to use',
      whatAgentDoes: 'What the agent runs',
      examplePrompt: 'Prompt example',
      copyPrompt: 'Copy prompt',
      promptCopied: 'Prompt copied',
      connectedSkills: 'Connected skills in the workflow',
      viewOnGithub: 'View on mattpocock/skills',
    },
    categories: {
      'core-flow': 'Core Flow',
      engineering: 'Engineering & Architecture',
      productivity: 'Productivity & Context',
      setup: 'Setup & Routing',
    },
    categoryTabs: [
      { id: 'all', label: 'All Skills', shortLabel: 'All' },
      { id: 'core-flow', label: 'Core Flow', shortLabel: 'Core Flow' },
      { id: 'engineering', label: 'Engineering & Architecture', shortLabel: 'Engineering' },
      { id: 'productivity', label: 'Productivity & Context', shortLabel: 'Productivity' },
      { id: 'setup', label: 'Setup & Routing', shortLabel: 'Setup' },
    ],
  },

  es: {
    languageSelectorLabel: 'Seleccionar idioma',
    nav: {
      ariaLabel: 'Navegación principal',
      flow: 'Flujo',
      router: 'Enrutador',
      catalog: 'Catálogo',
      install: 'Instalación',
      cta: 'Abrir /ask-matt',
    },
    hero: {
      headline: 'Disciplina de ingeniería sénior para tus agentes de código',
      leadPrefix:
        'Un mapa interactivo del repositorio de Matt Pocock. Recorre la columna Idea-to-Ship, encuentra el comando exacto con el enrutador',
      leadSuffix:
        'e inspecciona cómo cada skill estructura diseño, pruebas y revisión.',
      primaryCta: 'Explorar flujo Idea-to-Ship',
      githubCta: 'Ver repositorio en GitHub',
      quickInstallTitle: 'Instalación rápida',
      installMethodAria: 'Método de instalación',
      copy: 'Copiar',
      copied: 'Copiado',
      copyCommandAria: (cmd) => `Copiar comando ${cmd}`,
      stats: {
        skills: 'skills mapeados',
        stages: 'etapas Idea-to-Ship',
        categories: 'categorías',
      },
    },
    flow: {
      kicker: '01. Flujo Principal',
      heading: 'La columna Idea-to-Ship',
      description:
        'En lugar de pasar de una idea suelta directo al código, los 6 skills centrales encadenan refinamiento, especificación, división en tickets, implementación, revisión y entrega.',
      prevStageAria: 'Etapa anterior del flujo',
      nextStageAria: 'Siguiente etapa del flujo',
      tablistAria: 'Etapas del flujo Idea-to-Ship',
      stageLabel: (n) => `Etapa 0${n}`,
      alsoKnownAs: 'también',
      inspectCta: 'Ver detalles y ejemplo de prompt',
      copiedCommand: 'Comando copiado',
      copyCommand: (cmd) => `Copiar ${cmd}`,
      whatHappensHeading: 'Qué ocurre en esta etapa',
    },
    router: {
      kicker: '02. Enrutador /ask-matt',
      heading: '¿Qué skill deberías usar ahora?',
      description:
        'Elige el escenario que mejor describe tu bloqueo actual o escribe lo que está pasando para recibir la secuencia recomendada.',
      inputPlaceholder: 'Ej: bug en producción, sesión larga, nueva idea...',
      inputAria: 'Describe tu bloqueo para el enrutador /ask-matt',
      clearAria: 'Limpiar búsqueda del enrutador',
      frequentScenarios: 'Escenarios frecuentes',
      noDirectMatchPrefix: 'Sin coincidencia directa para',
      defaultSuggestion: 'Sugerencia predeterminada',
      recommendedTrack: 'Ruta recomendada',
      skillSingular: 'skill',
      skillPlural: 'skills',
      startWith: (cmd) => `Empezar con ${cmd}`,
    },
    catalog: {
      kicker: '03. Catálogo Completo',
      heading: 'Todos los skills del repositorio',
      description:
        'Pasa el cursor sobre cualquier tarjeta para activar la micro-animación del icono o haz clic para abrir la guía completa con un ejemplo de prompt.',
      showingPrefix: 'Mostrando',
      showingOf: 'de',
      showingSuffix: 'skills',
      filterTabsAria: 'Filtrar skills por categoría',
      searchPlaceholder: 'Filtrar por comando o tema...',
      searchAria: 'Filtrar catálogo de skills',
      clearSearchAria: 'Limpiar búsqueda del catálogo',
      emptyTitle: 'No se encontraron skills para esta búsqueda',
      emptyHintPrefix: 'Prueba otro comando (como',
      emptyHintOr: 'o',
      emptyHintSuffix: ') o limpia los filtros activos.',
      resetFilters: 'Limpiar filtros',
      card: {
        stagePrefix: 'Etapa 0',
        inspectLink: 'Ver flujo y ejemplo',
        inspectAria: (cmd, title) => `Inspeccionar skill ${cmd} — ${title}`,
      },
    },
    install: {
      kicker: '04. Instalación',
      heading: 'Empieza en menos de un minuto',
      description:
        'Elige el plugin oficial para Claude Code o instala copias locales editables por CLI para Cursor, Copilot y otros agentes compatibles.',
      claudeLabel: 'Claude Code (Plugin)',
      claudeDescription:
        'Instalación gestionada directamente como plugin oficial en Claude Code.',
      npxLabel: 'Cursor, Copilot y Local (npx)',
      npxDescription:
        'Agrega copias locales editables en tu repositorio para cualquier agente compatible.',
      setupLabel: 'Primer paso en el proyecto',
      setupDescription:
        'Calibra la carpeta de specs, el gestor de issues y las etiquetas de triaje.',
      footerTagline: 'Vitrina interactiva basada en el repositorio oficial',
    },
    drawer: {
      closeAria: 'Cerrar detalles del skill',
      close: 'Cerrar',
      stagePrefix: 'Idea-to-Ship 0',
      aliasPrefix: 'Alias:',
      copyCommand: 'Copiar comando',
      whenToUse: 'Cuándo usarlo',
      whatAgentDoes: 'Qué ejecuta el agente',
      examplePrompt: 'Ejemplo de prompt',
      copyPrompt: 'Copiar prompt',
      promptCopied: 'Prompt copiado',
      connectedSkills: 'Skills conectados en el flujo',
      viewOnGithub: 'Ver en mattpocock/skills',
    },
    categories: {
      'core-flow': 'Flujo Principal',
      engineering: 'Ingeniería y Arquitectura',
      productivity: 'Productividad y Contexto',
      setup: 'Configuración y Enrutado',
    },
    categoryTabs: [
      { id: 'all', label: 'Todos los Skills', shortLabel: 'Todos' },
      { id: 'core-flow', label: 'Flujo Principal', shortLabel: 'Flujo Principal' },
      { id: 'engineering', label: 'Ingeniería y Arquitectura', shortLabel: 'Ingeniería' },
      { id: 'productivity', label: 'Productividad y Contexto', shortLabel: 'Productividad' },
      { id: 'setup', label: 'Configuración y Enrutado', shortLabel: 'Setup' },
    ],
  },
};
