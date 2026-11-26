import { UI_COPY, type Locale } from './i18n';
import {
  SCENARIO_TRANSLATIONS_EN,
  SCENARIO_TRANSLATIONS_ES,
  SKILL_TRANSLATIONS_EN,
  SKILL_TRANSLATIONS_ES,
} from './skillsTranslations';

export type SkillCategory = 'core-flow' | 'engineering' | 'productivity' | 'setup';

export type SkillIconKey =
  | 'grill-me'
  | 'to-spec'
  | 'to-tickets'
  | 'implement'
  | 'code-review'
  | 'pr'
  | 'ask-matt'
  | 'setup-skills'
  | 'tdd'
  | 'diagnose'
  | 'architecture'
  | 'triage'
  | 'wayfinder'
  | 'prototype'
  | 'zoom-out'
  | 'handoff'
  | 'write-a-skill'
  | 'retro';

export interface Skill {
  id: string;
  command: string;
  aliases?: string[];
  title: string;
  category: SkillCategory;
  categoryLabel: string;
  stageNumber?: number;
  tagline: string;
  summary: string;
  whenToUse: string[];
  workflowSteps: string[];
  examplePrompt: string;
  relatedSkillIds: string[];
  iconKey: SkillIconKey;
  githubPath: string;
}

export interface RouterScenario {
  id: string;
  label: string;
  situation: string;
  keywords: string[];
  recommendedSkillIds: string[];
  rationale: string;
}

export interface CategoryMeta {
  id: 'all' | SkillCategory;
  label: string;
  shortLabel: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: 'Todos os Skills', shortLabel: 'Todos' },
  { id: 'core-flow', label: 'Fluxo Principal', shortLabel: 'Fluxo Principal' },
  { id: 'engineering', label: 'Engenharia & Arquitetura', shortLabel: 'Engenharia' },
  { id: 'productivity', label: 'Produtividade & Contexto', shortLabel: 'Produtividade' },
  { id: 'setup', label: 'Setup & Roteamento', shortLabel: 'Setup' },
];

export const SKILLS: Skill[] = [
  {
    id: 'grill-me',
    command: '/grill-me',
    aliases: ['/grill-with-docs'],
    title: 'Interrogatório de Design',
    category: 'core-flow',
    categoryLabel: 'Fluxo Principal',
    stageNumber: 1,
    tagline: 'Pressiona cada ramificação do seu plano até eliminar ambiguidades.',
    summary:
      'Entrevista você de forma implacável sobre uma ideia, arquitetura ou feature até que cada caso de borda, trade-off e decisão crítica da árvore de design seja resolvido e registrado.',
    whenToUse: [
      'Você tem uma ideia promissora, mas ainda cheia de suposições implícitas.',
      'Precisa validar requisitos técnicos e decisões de arquitetura (ADRs) antes de escrever código.',
      'Quer evitar retrabalho caro causado por especificações vagas enviadas direto para o agente.',
    ],
    workflowSteps: [
      'Mapeia a árvore de decisões a partir do seu briefing inicial e da documentação existente no repositório.',
      'Faz perguntas diretas, uma ramificação por vez, oferecendo recomendações opinativas baseadas no código real.',
      'Fecha lacunas de borda, regras de negócio e restrições de interface antes de avançar.',
      'Consolida todas as respostas em decisões explícitas prontas para virar especificação.',
    ],
    examplePrompt:
      '/grill-me Quero adicionar webhooks com retry exponencial para eventos de faturamento sem acoplar isso ao checkout síncrono.',
    relatedSkillIds: ['to-spec', 'prototype', 'ask-matt'],
    iconKey: 'grill-me',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'to-spec',
    command: '/to-spec',
    aliases: ['/to-prd'],
    title: 'Conversão em Especificação',
    category: 'core-flow',
    categoryLabel: 'Fluxo Principal',
    stageNumber: 2,
    tagline: 'Transforma decisões acordadas em uma especificação formal e verificável.',
    summary:
      'Pega o alinhamento obtido na conversa de design e o cristaliza em um documento estruturado de requisitos (PRD/Spec) claro, testável e sem espaço para interpretações conflitantes.',
    whenToUse: [
      'Logo após encerrar uma sessão de /grill-me com todas as decisões fechadas.',
      'Quando precisa documentar contratos de API, estados de erro e critérios de aceitação.',
      'Para criar a fonte única de verdade que guiará tanto a implementação quanto o code review.',
    ],
    workflowSteps: [
      'Extrai decisões, limites de escopo e não-objetivos da conversa atual.',
      'Estrutura o documento com problema, arquitetura proposta, modelos de dados e casos de borda.',
      'Define critérios objetivos de verificação que serão cobrados durante os testes e revisão.',
      'Salva a especificação no padrão de documentação configurado no repositório.',
    ],
    examplePrompt:
      '/to-spec Converta as decisões desta conversa sobre webhooks em uma spec pronta para revisão técnica.',
    relatedSkillIds: ['grill-me', 'to-tickets', 'code-review'],
    iconKey: 'to-spec',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'to-tickets',
    command: '/to-tickets',
    aliases: ['/to-issues'],
    title: 'Fatiamento em Tickets',
    category: 'core-flow',
    categoryLabel: 'Fluxo Principal',
    stageNumber: 3,
    tagline: 'Quebra uma spec grande em tarefas pequenas, sequenciais e prontas para agentes.',
    summary:
      'Decompõe uma especificação em fatias verticais independentes e gerenciáveis, com ordem de dependência, critérios de aceite claros e escopo reduzido para execução segura.',
    whenToUse: [
      'A especificação está pronta, mas implementá-la de uma única vez geraria um diff gigante.',
      'Você quer executar tarefas em sequência controlada ou delegar sub-tarefas com contexto limpo.',
      'Precisa cadastrar issues bem estruturadas no tracker do projeto.',
    ],
    workflowSteps: [
      'Analisa a spec completa e identifica fronteiras naturais de entrega incremental.',
      'Ordena as tarefas em grafo de dependência (schema → lógica de domínio → interface).',
      'Redige cada ticket com objetivo único, arquivos prováveis e critério de conclusão verificável.',
      'Publica ou exporta os tickets seguindo as labels e convenções do repositório.',
    ],
    examplePrompt:
      '/to-tickets Quebre a spec de webhooks em tickets pequenos que possam ser entregues e testados um por vez.',
    relatedSkillIds: ['to-spec', 'implement', 'triage'],
    iconKey: 'to-tickets',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'implement',
    command: '/implement',
    aliases: ['/implement-spec'],
    title: 'Implementação Disciplinada',
    category: 'core-flow',
    categoryLabel: 'Fluxo Principal',
    stageNumber: 4,
    tagline: 'Executa o ticket com rigor, orientado a testes e aderente à spec.',
    summary:
      'Constrói o código descrito no ticket ou especificação seguindo disciplina de engenharia: lê o contexto existente, escreve testes primeiro quando aplicável e valida o resultado antes de concluir.',
    whenToUse: [
      'Você já tem um ticket ou spec bem definido e quer passar da teoria para código funcional.',
      'Deseja manter commits enxutos, tipagem rigorosa e verificação automatizada no processo.',
      'Quer evitar que o agente invente abstrações extras fora do escopo combinado.',
    ],
    workflowSteps: [
      'Lê o ticket, a spec de referência e os módulos adjacentes para respeitar os padrões locais.',
      'Executa ciclos incrementais de implementação com validação contínua (tipos, lint e testes).',
      'Mantém o escopo estrito ao critério de aceitação sem refatorações não solicitadas.',
      'Apresenta um resumo objetivo do que foi alterado e das verificações que passaram.',
    ],
    examplePrompt:
      '/implement Execute o ticket #42 (fila de retry para webhooks) garantindo cobertura de testes unitários.',
    relatedSkillIds: ['to-tickets', 'tdd', 'code-review'],
    iconKey: 'implement',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'code-review',
    command: '/code-review',
    title: 'Revisão em Dois Eixos',
    category: 'core-flow',
    categoryLabel: 'Fluxo Principal',
    stageNumber: 5,
    tagline: 'Audita o diff contra os padrões do repositório e a fidelidade à spec.',
    summary:
      'Avalia alterações locais ou recentes em duas frentes independentes: qualidade estrutural do código (code smells, segurança, tipagem) e aderência exata ao que foi prometido na especificação.',
    whenToUse: [
      'Antes de abrir um Pull Request para capturar falhas sutis ainda na máquina local.',
      'Para revisar código escrito por outra pessoa ou por uma sessão anterior de agente.',
      'Quando quer verificar se algum requisito ou caso de borda da spec ficou para trás.',
    ],
    workflowSteps: [
      'Inspeciona o diff atual completo e compara com a spec ou ticket associado.',
      'Executa auditoria de qualidade: vazamentos de abstração, estados não tratados, performance e testes.',
      'Separa apontamentos bloqueantes de sugestões menores para evitar ruído.',
      'Propõe correções precisas e objetivas em cada ponto encontrado.',
    ],
    examplePrompt:
      '/code-review Revise minhas alterações não commitadas comparando com os critérios do ticket #42.',
    relatedSkillIds: ['implement', 'pr', 'architecture'],
    iconKey: 'code-review',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'pr',
    command: '/pr',
    title: 'Pull Request com Evidências',
    category: 'core-flow',
    categoryLabel: 'Fluxo Principal',
    stageNumber: 6,
    tagline: 'Gera um PR claro, enxuto e sustentado pelo diff real e testes executados.',
    summary:
      'Sintetiza o contexto da mudança, o porquê das decisões tomadas e o plano de verificação real em uma descrição de Pull Request pronta para revisores humanos aprovarem rápido.',
    whenToUse: [
      'O código passou na revisão local e os testes estão verdes.',
      'Você quer evitar descrições genéricas de PR que não explicam o impacto nem como testar.',
      'Deseja manter histórico de engenharia limpo e rastreável entre issue, spec e entrega.',
    ],
    workflowSteps: [
      'Analisa commits da branch, diff final e referências de issues vinculadas.',
      'Redige resumo focado no comportamento alterado e nas decisões não óbvias.',
      'Lista evidências reais de testes e passos práticos para validação manual.',
      'Formata título e corpo prontos para abertura ou atualização do PR.',
    ],
    examplePrompt:
      '/pr Prepare título e descrição do Pull Request para esta branch referenciando o ticket #42.',
    relatedSkillIds: ['code-review', 'retro', 'handoff'],
    iconKey: 'pr',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'ask-matt',
    command: '/ask-matt',
    title: 'Roteador de Skills',
    category: 'setup',
    categoryLabel: 'Setup & Roteamento',
    tagline: 'Mapa vivo do repositório: descreva seu momento e descubra qual skill usar.',
    summary:
      'Atua como meta-skill orientador. Você explica em linguagem natural onde está travado — uma ideia crua, um bug recorrente, uma sessão inchada — e ele recomenda o comando ou sequência exata.',
    whenToUse: [
      'Você não tem certeza qual skill do repositório se encaixa melhor no seu problema atual.',
      'Quer montar uma cadência combinada de 2 ou 3 skills para uma tarefa complexa.',
      'Está começando a usar o conjunto mattpocock/skills no seu fluxo diário.',
    ],
    workflowSteps: [
      'Interpreta o estágio atual do trabalho (descoberta, bug, refatoração, entrega ou contexto).',
      'Consulta o catálogo completo de skills instalados e suas pré-condições.',
      'Retorna a trilha recomendada na ordem ideal com justificativa curta.',
      'Indica o primeiro prompt pronto para destravar a sessão imediatamente.',
    ],
    examplePrompt:
      '/ask-matt Recebi um relato de race condition em produção e ainda não sei se devo debugar direto ou mapear o módulo antes.',
    relatedSkillIds: ['setup-skills', 'grill-me', 'diagnose'],
    iconKey: 'ask-matt',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'setup-skills',
    command: '/setup-matt-pocock-skills',
    title: 'Configuração do Repositório',
    category: 'setup',
    categoryLabel: 'Setup & Roteamento',
    tagline: 'Ensina aos demais skills onde vivem suas docs, issues e convenções.',
    summary:
      'Analisa a estrutura do seu projeto uma única vez para mapear issue tracker, labels de triagem, convenções de teste e pasta docs/agents/, calibrando todo o ecossistema.',
    whenToUse: [
      'Na primeira vez em que você instala o pacote de skills em um novo repositório.',
      'Quando a equipe muda a estrutura de documentação ou o fluxo de issues/labels.',
      'Para evitar repetir instruções de projeto em toda conversa com o agente.',
    ],
    workflowSteps: [
      'Inspeciona package.json, diretórios, git remote, scripts de teste e convenções existentes.',
      'Identifica onde specs, ADRs e documentação de agentes devem ser armazenados.',
      'Configura mapeamento de labels de triagem e formato padrão de tickets.',
      'Grava a configuração local consumida automaticamente pelos outros skills.',
    ],
    examplePrompt:
      '/setup-matt-pocock-skills Configure este monorepo usando GitHub Issues e specs em docs/specs.',
    relatedSkillIds: ['ask-matt', 'triage', 'write-a-skill'],
    iconKey: 'setup-skills',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'tdd',
    command: '/tdd',
    title: 'Ciclo Red-Green-Refactor',
    category: 'engineering',
    categoryLabel: 'Engenharia & Arquitetura',
    tagline: 'Impõe desenvolvimento estritamente guiado por testes, passo a passo.',
    summary:
      'Força a disciplina clássica de TDD com agentes de IA: escreve primeiro um teste que falha pelo motivo certo, implementa o mínimo para passar e só então refatora com segurança.',
    whenToUse: [
      'Regras de negócio críticas, parsers, máquinas de estado ou cálculos financeiros.',
      'Quando o agente tende a escrever testes acoplados à implementação em vez de ao comportamento.',
      'Para construir confiança incremental enquanto modela interfaces limpas.',
    ],
    workflowSteps: [
      'Define o próximo comportamento observável e escreve um único teste falhando (Red).',
      'Verifica que a falha ocorre pelo comportamento ausente e não por erro de sintaxe.',
      'Escreve o código mínimo necessário para fazer o teste passar (Green).',
      'Refatora duplicações mantendo toda a suíte verde antes do próximo ciclo.',
    ],
    examplePrompt:
      '/tdd Implemente o calculador de descontos progressivos cobrindo limites de faixa e cupons cumulativos.',
    relatedSkillIds: ['implement', 'diagnose', 'architecture'],
    iconKey: 'tdd',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'diagnose',
    command: '/diagnose',
    aliases: ['/diagnosing-bugs'],
    title: 'Diagnóstico Sistemático de Bugs',
    category: 'engineering',
    categoryLabel: 'Engenharia & Arquitetura',
    tagline: 'Reproduz, levanta hipóteses e prova a causa raiz antes de tocar no código.',
    summary:
      'Impede chutes apressados em bugs difíceis. Conduz investigação científica com reprodução determinística, instrumentação de hipóteses e verificação por mutação antes de aplicar a correção.',
    whenToUse: [
      'Bugs intermitentes, regressões sutis ou falhas onde o sintoma engana a causa real.',
      'Quando tentativas anteriores de "tentar corrigir rápido" só mascararam o erro.',
      'Para garantir que o bug corrigido nunca mais volte com um teste de regressão fiel.',
    ],
    workflowSteps: [
      'Isola o problema construindo um caso mínimo e confiável de reprodução.',
      'Formula hipóteses verificáveis e testa cada uma com evidências reais de execução.',
      'Confirma a causa raiz exata (incluindo checagem de mutação) antes de editar a solução.',
      'Aplica a correção cirúrgica e consolida o teste automatizado de regressão.',
    ],
    examplePrompt:
      '/diagnose Usuários com fuso UTC-3 estão recebendo cobrança duplicada na virada do mês.',
    relatedSkillIds: ['tdd', 'zoom-out', 'triage'],
    iconKey: 'diagnose',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'architecture',
    command: '/improve-codebase-architecture',
    title: 'Refatoração para Módulos Profundos',
    category: 'engineering',
    categoryLabel: 'Engenharia & Arquitetura',
    tagline: 'Identifica atrito estrutural e transforma módulos rasos em interfaces profundas.',
    summary:
      'Faz uma auditoria arquitetural inspirada em John Ousterhout (A Philosophy of Software Design) para localizar abstrações vazadas, acoplamento excessivo e gargalos de testabilidade.',
    whenToUse: [
      'Pequenas mudanças exigem editar 8 arquivos diferentes em camadas espalhadas.',
      'Testar lógica de domínio exige dezenas de mocks frágeis.',
      'A base cresceu rápido e precisa recuperar clareza estrutural antes da próxima fase.',
    ],
    workflowSteps: [
      'Mapeia fronteiras entre módulos, dependências cíclicas e camadas pass-through rasas.',
      'Destaca pontos de maior alavancagem onde consolidar responsabilidade reduz complexidade.',
      'Propõe interfaces profundas com menos superfície pública e maior cobertura testável.',
      'Cria plano de refatoração seguro em etapas incrementais.',
    ],
    examplePrompt:
      '/improve-codebase-architecture Analise src/billing e aponte onde estamos espalhando regras em wrappers rasos.',
    relatedSkillIds: ['wayfinder', 'code-review', 'to-tickets'],
    iconKey: 'architecture',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'wayfinder',
    command: '/wayfinder',
    title: 'Navegação de Código & Contexto',
    category: 'engineering',
    categoryLabel: 'Engenharia & Arquitetura',
    tagline: 'Mapeia rapidamente territórios desconhecidos e coordena sessões longas.',
    summary:
      'Explora a base de código de forma orientada para desenhar o mapa mental de módulos, pontos de entrada e fluxos de dados antes de tomar decisões em áreas pouco familiares.',
    whenToUse: [
      'Você acabou de entrar em um módulo legado ou desconhecido do projeto.',
      'Precisa entender onde uma entidade nasce, se transforma e é persistida ponta a ponta.',
      'Está coordenando trabalho complexo que atravessa várias partes do sistema.',
    ],
    workflowSteps: [
      'Rastreia entrypoints, rotas, dependências e fronteiras de estado no código real.',
      'Sintetiza um mapa claro de responsabilidades sem despejar código irrelevante.',
      'Sinaliza acoplamentos ocultos, invariantes e pontos sensíveis a alterações.',
      'Entrega um guia direto para iniciar design ou implementação com segurança.',
    ],
    examplePrompt:
      '/wayfinder Mapeie o fluxo completo de autenticação e refresh de sessão neste repositório.',
    relatedSkillIds: ['zoom-out', 'architecture', 'grill-me'],
    iconKey: 'wayfinder',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'prototype',
    command: '/prototype',
    title: 'Exploração Rápida de Protótipos',
    category: 'engineering',
    categoryLabel: 'Engenharia & Arquitetura',
    tagline: 'Valida alternativas técnicas em experimentos isolados antes de se comprometer.',
    summary:
      'Permite testar rapidamente duas ou mais abordagens técnicas ou de UX em espaço isolado, coletando evidências práticas antes de formalizar a solução definitiva em spec.',
    whenToUse: [
      'Há incerteza real entre duas bibliotecas, padrões de interação ou abordagens de API.',
      'Você quer ver algo funcionando em minutos para validar a ergonomia com o time.',
      'Precisa des-riscar a parte mais difícil antes de investir na engenharia completa.',
    ],
    workflowSteps: [
      'Isola o experimento da estrutura crítica de produção para manter reversibilidade.',
      'Constrói o mínimo necessário para testar a hipótese técnica ou visual central.',
      'Documenta aprendizados, limitações descobertas e custo de cada caminho.',
      'Prepara o terreno para descartar o rascunho ou evoluir para /to-spec.',
    ],
    examplePrompt:
      '/prototype Crie um protótipo isolado comparando drag-and-drop com reordenação por teclado na lista de tickets.',
    relatedSkillIds: ['grill-me', 'to-spec', 'wayfinder'],
    iconKey: 'prototype',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'triage',
    command: '/triage',
    aliases: ['/triage-issue'],
    title: 'Triagem & Classificação de Issues',
    category: 'engineering',
    categoryLabel: 'Engenharia & Arquitetura',
    tagline: 'Classifica, prioriza e organiza issues recém-chegadas segundo seu esquema.',
    summary:
      'Processa relatos recebidos comparando com o código atual e a taxonomia configurada, definindo severidade, labels corretas, duplicatas prováveis e próximo passo recomendado.',
    whenToUse: [
      'A caixa de entrada de issues cresceu com relatos incompletos ou sem classificação.',
      'Você precisa separar bugs reais, dúvidas de uso e pedidos de melhoria.',
      'Quer preparar issues limpas antes de enviá-las para diagnóstico ou planejamento.',
    ],
    workflowSteps: [
      'Lê a issue e cruza rapidamente com os arquivos e labels do repositório.',
      'Verifica se há contexto suficiente ou lista perguntas objetivas para o autor.',
      'Atribui categoria, prioridade e área técnica conforme a configuração local.',
      'Sugere encaminhamento imediato (/diagnose, /grill-me ou backlog).',
    ],
    examplePrompt:
      '/triage Analise as últimas issues abertas sobre exportação CSV e sugira labels e prioridades.',
    relatedSkillIds: ['setup-skills', 'diagnose', 'to-tickets'],
    iconKey: 'triage',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'handoff',
    command: '/handoff',
    aliases: ['/claude-handoff'],
    title: 'Passagem de Bastão Limpa',
    category: 'productivity',
    categoryLabel: 'Produtividade & Contexto',
    tagline: 'Compacta uma sessão longa em um documento cirúrgico para continuar sem perdas.',
    summary:
      'Quando a janela de contexto fica cheia ou o dia termina no meio de uma entrega, resume decisões tomadas, arquivos alterados, estado dos testes e próximos passos exatos para uma nova sessão.',
    whenToUse: [
      'A conversa atual atingiu um tamanho onde o agente começa a perder foco ou qualidade.',
      'Você precisa pausar o trabalho e retomar amanhã (ou passar para outro engenheiro).',
      'Quer iniciar uma janela fresca mantendo 100% do contexto útil e 0% de ruído.',
    ],
    workflowSteps: [
      'Coleta estado atual do git, decisões arquiteturais já fechadas e becos sem saída já testados.',
      'Descarta conversas descartáveis e erros antigos que não importam mais.',
      'Gera um documento conciso com checklist exato de retomada imediata.',
      'Deixa o primeiro comando pronto para colar na sessão seguinte.',
    ],
    examplePrompt:
      '/handoff Compacte o estado atual desta migração para eu retomar em uma sessão limpa amanhã.',
    relatedSkillIds: ['retro', 'wayfinder', 'pr'],
    iconKey: 'handoff',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'zoom-out',
    command: '/zoom-out',
    title: 'Visão Panorâmica',
    category: 'productivity',
    categoryLabel: 'Produtividade & Contexto',
    tagline: 'Dá um passo atrás quando você se perde nos detalhes de implementação.',
    summary:
      'Interrompe a visão em túnel e reconecta o trabalho atual ao objetivo maior do sistema, mostrando alternativas mais simples e onde o esforço realmente gera retorno.',
    whenToUse: [
      'Você está há horas brigando com um detalhe obscuro e perdeu a noção do todo.',
      'Suspeita que está resolvendo o problema errado ou complicando algo simples.',
      'Quer explicar rapidamente o contexto amplo de um subsistema complexo.',
    ],
    workflowSteps: [
      'Pausa a edição imediata e resume o problema de negócio acima do código.',
      'Expõe quais restrições são reais e quais foram autoimpostas durante a sessão.',
      'Apresenta uma visão de alto nível dos módulos envolvidos e caminhos alternativos.',
      'Ajuda você a escolher se continua, simplifica ou pivota a abordagem.',
    ],
    examplePrompt:
      '/zoom-out Estamos tentando ajustar 4 hooks diferentes para sincronizar esse estado — qual é a visão maior aqui?',
    relatedSkillIds: ['wayfinder', 'architecture', 'ask-matt'],
    iconKey: 'zoom-out',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'write-a-skill',
    command: '/write-a-skill',
    title: 'Criador de Novos Skills',
    category: 'productivity',
    categoryLabel: 'Produtividade & Contexto',
    tagline: 'Transforma fluxos recorrentes da sua equipe em novos skills reutilizáveis.',
    summary:
      'Ajuda você a projetar e escrever novos arquivos de skill seguindo princípios de progressive disclosure, instruções claras e gatilhos objetivos para o agente.',
    whenToUse: [
      'Você percebe que repete as mesmas instruções para o agente toda semana.',
      'Quer codificar padrões internos da equipe (migrations, releases, design tokens) em comandos.',
      'Deseja contribuir ou estender o conjunto de skills do seu projeto.',
    ],
    workflowSteps: [
      'Identifica o gatilho, as entradas necessárias e o formato de saída ideal do novo skill.',
      'Estrutura o prompt em camadas curtas para não desperdiçar tokens de contexto.',
      'Inclui guardrails claros de verificação e casos em que o skill não deve agir.',
      'Cria o arquivo pronto no diretório de skills do projeto.',
    ],
    examplePrompt:
      '/write-a-skill Crie um skill /release-notes que leia os PRs da semana e gere changelog orientado a usuários.',
    relatedSkillIds: ['setup-skills', 'retro', 'ask-matt'],
    iconKey: 'write-a-skill',
    githubPath: 'https://github.com/mattpocock/skills',
  },
  {
    id: 'retro',
    command: '/retro',
    title: 'Retrospectiva de Sessão',
    category: 'productivity',
    categoryLabel: 'Produtividade & Contexto',
    tagline: 'Extrai melhorias concretas para seu ambiente e prompts após sessões difíceis.',
    summary:
      'Analisa onde o agente tropeçou durante a tarefa recém-concluída e gera uma lista priorizada de ajustes em documentação, regras, scripts ou skills para a próxima vez ser fluida.',
    whenToUse: [
      'Depois de uma entrega trabalhosa em que você precisou corrigir o agente várias vezes.',
      'Para evoluir continuamente o arquivo de instruções do repositório e os testes locais.',
      'No encerramento de um marco técnico importante.',
    ],
    workflowSteps: [
      'Revisa os pontos de atrito, comandos que falharam e mal-entendidos da sessão.',
      'Distingue falta de documentação no repo de lacunas nos scripts de validação.',
      'Prioriza 3 a 5 melhorias pequenas de alto impacto imediato.',
      'Oferece aplicar as melhorias selecionadas diretamente nos docs ou skills.',
    ],
    examplePrompt:
      '/retro Faça uma retrospectiva desta sessão e aponte o que podemos documentar para o agente não errar os mocks na próxima.',
    relatedSkillIds: ['write-a-skill', 'handoff', 'pr'],
    iconKey: 'retro',
    githubPath: 'https://github.com/mattpocock/skills',
  },
];

export const IDEA_TO_SHIP_SKILLS: Skill[] = SKILLS.filter(
  (skill) => typeof skill.stageNumber === 'number'
).sort((a, b) => (a.stageNumber ?? 0) - (b.stageNumber ?? 0));

export const ROUTER_SCENARIOS: RouterScenario[] = [
  {
    id: 'vague-idea',
    label: 'Ideia ainda vaga',
    situation: 'Tenho uma ideia nova de feature, mas vários detalhes e casos de borda ainda não estão fechados.',
    keywords: ['ideia', 'feature', 'novo', 'planejar', 'design', 'comecar', 'começar', 'requisito', 'spec', 'prd'],
    recommendedSkillIds: ['grill-me', 'to-spec', 'to-tickets'],
    rationale:
      'Comece eliminando suposições com /grill-me, formalize o acordo em /to-spec e só então quebre o trabalho em fatias pequenas com /to-tickets.',
  },
  {
    id: 'elusive-bug',
    label: 'Bug difícil de reproduzir',
    situation: 'Recebi um bug intermitente ou regressão em produção e não quero sair chutando correções.',
    keywords: ['bug', 'erro', 'falha', 'producao', 'produção', 'debug', 'regressao', 'regressão', 'reproduzir', 'crash'],
    recommendedSkillIds: ['diagnose', 'tdd', 'code-review'],
    rationale:
      'Use /diagnose para provar a causa raiz com reprodução confiável, fixe o comportamento com /tdd e valide o diff antes do merge com /code-review.',
  },
  {
    id: 'bloated-session',
    label: 'Sessão longa demais',
    situation: 'A conversa com o agente ficou extensa, o contexto está poluído e preciso continuar sem perder nada.',
    keywords: ['sessao', 'sessão', 'contexto', 'longa', 'compactar', 'continuar', 'pausar', 'amanha', 'amanhã', 'handoff'],
    recommendedSkillIds: ['handoff', 'wayfinder'],
    rationale:
      'Gere um resumo cirúrgico com /handoff para abrir uma janela limpa e use /wayfinder se a nova sessão precisar reconectar módulos adjacentes.',
  },
  {
    id: 'shallow-architecture',
    label: 'Código raso e frágil',
    situation: 'Cada mudança pequena exige editar vários arquivos e os testes estão cheios de mocks frágeis.',
    keywords: ['arquitetura', 'refatorar', 'codigo', 'código', 'raso', 'acoplamento', 'mock', 'testabilidade', 'legado', 'modulos'],
    recommendedSkillIds: ['wayfinder', 'architecture', 'to-tickets'],
    rationale:
      'Mapeie as fronteiras reais com /wayfinder, identifique módulos rasos com /improve-codebase-architecture e transforme o plano em passos seguros via /to-tickets.',
  },
  {
    id: 'ready-to-ship',
    label: 'Spec pronta para entrega',
    situation: 'A especificação já está validada e quero executar, revisar e abrir um Pull Request impecável.',
    keywords: ['implementar', 'entregar', 'pr', 'pull request', 'revisar', 'ship', 'ticket', 'deploy', 'merge'],
    recommendedSkillIds: ['implement', 'code-review', 'pr'],
    rationale:
      'Execute o escopo com disciplina em /implement, faça auditoria nos dois eixos com /code-review e feche com evidências claras em /pr.',
  },
  {
    id: 'first-time-setup',
    label: 'Primeiro uso no repo',
    situation: 'Acabei de instalar os skills do Matt Pocock em um repositório e quero calibrar tudo direito.',
    keywords: ['instalar', 'setup', 'configurar', 'novo repo', 'primeiro', 'triagem', 'criar skill', 'time'],
    recommendedSkillIds: ['setup-skills', 'ask-matt', 'write-a-skill'],
    rationale:
      'Rode /setup-matt-pocock-skills uma vez para mapear docs e issues, use /ask-matt para guiar o dia a dia e crie comandos próprios com /write-a-skill.',
  },
];

export const INSTALL_COMMANDS = {
  claude: {
    label: 'Claude Code (Plugin)',
    command: 'claude plugins install mattpocock-skills',
    description: 'Instalação gerenciada diretamente como plugin oficial no Claude Code.',
  },
  npx: {
    label: 'Cursor, Copilot & Local (npx)',
    command: 'npx skills@latest add mattpocock/skills',
    description: 'Adiciona cópias locais editáveis no seu repositório para qualquer agente compatível.',
  },
  setup: {
    label: 'Primeiro passo no projeto',
    command: '/setup-matt-pocock-skills',
    description: 'Calibra pasta de specs, issue tracker e labels de triagem do seu repositório.',
  },
};

export function getLocalizedSkills(locale: Locale): Skill[] {
  const categoryLabels = UI_COPY[locale].categories;
  if (locale === 'pt-BR') {
    return SKILLS;
  }

  const dict =
    locale === 'en' ? SKILL_TRANSLATIONS_EN : SKILL_TRANSLATIONS_ES;

  return SKILLS.map((skill) => {
    const tr = dict[skill.id];
    if (!tr) return { ...skill, categoryLabel: categoryLabels[skill.category] };
    return {
      ...skill,
      categoryLabel: categoryLabels[skill.category],
      title: tr.title,
      tagline: tr.tagline,
      summary: tr.summary,
      whenToUse: tr.whenToUse,
      workflowSteps: tr.workflowSteps,
      examplePrompt: tr.examplePrompt,
    };
  });
}

export function getLocalizedSkillById(
  id: string,
  locale: Locale
): Skill | undefined {
  return getLocalizedSkills(locale).find((skill) => skill.id === id);
}

export function getLocalizedIdeaToShipSkills(locale: Locale): Skill[] {
  return getLocalizedSkills(locale)
    .filter((skill) => typeof skill.stageNumber === 'number')
    .sort((a, b) => (a.stageNumber ?? 0) - (b.stageNumber ?? 0));
}

export function getLocalizedRouterScenarios(locale: Locale): RouterScenario[] {
  if (locale === 'pt-BR') {
    return ROUTER_SCENARIOS;
  }

  const dict =
    locale === 'en' ? SCENARIO_TRANSLATIONS_EN : SCENARIO_TRANSLATIONS_ES;

  return ROUTER_SCENARIOS.map((scenario) => {
    const tr = dict[scenario.id];
    if (!tr) return scenario;
    return {
      ...scenario,
      label: tr.label,
      situation: tr.situation,
      keywords: tr.keywords,
      rationale: tr.rationale,
    };
  });
}

export function findSkillById(id: string): Skill | undefined {
  return SKILLS.find((skill) => skill.id === id);
}

export function matchScenarioByQuery(
  query: string,
  locale: Locale = 'pt-BR'
): RouterScenario | null {
  const normalized = query
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!normalized) return null;

  const localizedScenarios = getLocalizedRouterScenarios(locale);
  let bestScenario: RouterScenario | null = null;
  let bestScore = 0;

  for (const scenario of localizedScenarios) {
    let score = 0;
    const ptBase = ROUTER_SCENARIOS.find((s) => s.id === scenario.id);
    const enTr = SCENARIO_TRANSLATIONS_EN[scenario.id];
    const esTr = SCENARIO_TRANSLATIONS_ES[scenario.id];

    const combinedKeywords = [
      ...scenario.keywords,
      ...(ptBase?.keywords ?? []),
      ...(enTr?.keywords ?? []),
      ...(esTr?.keywords ?? []),
    ];

    const haystack = `${scenario.label} ${scenario.situation} ${scenario.rationale}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    for (const kw of combinedKeywords) {
      const normalizedKw = kw
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (normalized.includes(normalizedKw) || normalizedKw.includes(normalized)) {
        score += 3;
      }
    }

    const words = normalized.split(/\s+/).filter((w) => w.length >= 3);
    for (const word of words) {
      if (haystack.includes(word)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestScenario = scenario;
    }
  }

  return bestScore > 0 ? bestScenario : null;
}
