export interface SkillTranslation {
  title: string;
  tagline: string;
  summary: string;
  whenToUse: string[];
  workflowSteps: string[];
  examplePrompt: string;
}

export interface ScenarioTranslation {
  label: string;
  situation: string;
  keywords: string[];
  rationale: string;
}

export const SKILL_TRANSLATIONS_EN: Record<string, SkillTranslation> = {
  'grill-me': {
    title: 'Design Grilling',
    tagline: 'Stress-tests every branch of your plan until zero ambiguities remain.',
    summary:
      'Relentlessly interviews you about a feature, plan, or architecture tree until every edge case, trade-off, and design branch is resolved and captured cleanly.',
    whenToUse: [
      'You have a promising idea that still hides unexamined assumptions.',
      'You need to lock down technical requirements and ADRs before writing code.',
      'You want to prevent expensive rework caused by vague specs handed to an agent.',
    ],
    workflowSteps: [
      'Maps the decision tree from your initial brief and existing repository docs.',
      'Asks sharp questions one branch at a time with opinionated recommendations.',
      'Closes edge cases, business rules, and interface constraints before moving on.',
      'Consolidates all agreed answers into explicit decisions ready for a spec.',
    ],
    examplePrompt:
      '/grill-me I want to add webhooks with exponential backoff for billing events without coupling them to synchronous checkout.',
  },
  'to-spec': {
    title: 'Spec Formalization',
    tagline: 'Turns agreed design decisions into a crisp, verifiable specification.',
    summary:
      'Takes the alignment reached during a design grilling session and distills it into a structured PRD/Spec that is clear, testable, and free of conflicting interpretations.',
    whenToUse: [
      'Right after finishing a /grill-me session with all design branches resolved.',
      'When you need documented API contracts, error states, and acceptance criteria.',
      'To establish the single source of truth that guides both implementation and code review.',
    ],
    workflowSteps: [
      'Extracts decisions, scope boundaries, and explicit non-goals from the conversation.',
      'Structures the document with problem statement, architecture, data models, and edge cases.',
      'Defines objective verification criteria enforced during testing and review.',
      'Writes the specification using the documentation conventions configured for your repo.',
    ],
    examplePrompt:
      '/to-spec Convert our agreed webhook decisions from this thread into a technical spec ready for review.',
  },
  'to-tickets': {
    title: 'Ticket Slicing',
    tagline: 'Splits a large spec into small, sequential, agent-ready tickets.',
    summary:
      'Decomposes a full specification into independent vertical slices with explicit dependency order, acceptance criteria, and tight scope for reliable execution.',
    whenToUse: [
      'The spec is finalized, but implementing it in one shot would create a huge diff.',
      'You want controlled sequential delivery or clean-context sub-tasks.',
      'You need well-structured issues filed directly into your project tracker.',
    ],
    workflowSteps: [
      'Analyzes the full specification to identify natural incremental delivery boundaries.',
      'Orders tickets into a clean dependency graph (schema → domain logic → UI).',
      'Drafts each ticket with a single goal, target files, and verifiable completion criteria.',
      'Publishes or exports tickets following your repository labels and conventions.',
    ],
    examplePrompt:
      '/to-tickets Break the webhook spec into small tickets that can be implemented and tested one by one.',
  },
  implement: {
    title: 'Disciplined Implementation',
    tagline: 'Builds the ticket test-first with strict adherence to the spec.',
    summary:
      'Executes the target ticket or specification with engineering discipline: reads surrounding conventions, writes tests first where applicable, and verifies the diff before wrapping up.',
    whenToUse: [
      'You have a clear ticket or spec and want to turn it into working, tested code.',
      'You want lean commits, strict typing, and automated verification built into the loop.',
      'You want to stop the agent from inventing unrequested abstractions outside scope.',
    ],
    workflowSteps: [
      'Reads the ticket, reference spec, and adjacent modules to match local patterns.',
      'Runs incremental implementation cycles with continuous type, lint, and test checks.',
      'Keeps the diff tightly bounded to acceptance criteria with zero drive-by refactors.',
      'Summarizes what changed alongside the exact verification checks that passed.',
    ],
    examplePrompt:
      '/implement Build ticket #42 (webhook retry queue) with full unit test coverage.',
  },
  'code-review': {
    title: 'Dual-Axis Code Review',
    tagline: 'Audits your diff against repo standards and spec adherence.',
    summary:
      'Reviews local or recent changes across two independent axes: structural code quality (smells, security, typing) and strict fidelity to the agreed specification.',
    whenToUse: [
      'Before opening a Pull Request to catch subtle issues while still local.',
      'To audit code written by a teammate or a previous agent session.',
      'When you want to verify that no edge case or spec requirement was missed.',
    ],
    workflowSteps: [
      'Inspects the full diff and cross-checks it against the linked spec or ticket.',
      'Audits code quality: leaky abstractions, unhandled states, performance, and tests.',
      'Separates blocking findings from minor nits so feedback stays high-signal.',
      'Proposes focused, concrete fixes for every issue surfaced.',
    ],
    examplePrompt:
      '/code-review Audit my uncommitted changes against the acceptance criteria in ticket #42.',
  },
  pr: {
    title: 'Evidence-Backed Pull Request',
    tagline: 'Drafts a crisp PR grounded in the real diff and test evidence.',
    summary:
      'Synthesizes the intent of the change, key engineering decisions, and real verification steps into a concise Pull Request description built for fast human review.',
    whenToUse: [
      'Your code passed local review and the test suite is green.',
      'You want to avoid generic PR templates that hide impact and verification steps.',
      'You want clean traceability connecting issue, spec, and shipped diff.',
    ],
    workflowSteps: [
      'Inspects branch commits, final diff, and linked issue references.',
      'Writes a concise summary focused on behavioral changes and non-obvious trade-offs.',
      'Lists concrete test evidence and practical manual verification steps.',
      'Outputs a ready-to-publish PR title and body.',
    ],
    examplePrompt:
      '/pr Draft the Pull Request title and description for this branch referencing ticket #42.',
  },
  'ask-matt': {
    title: 'Skill Router',
    tagline: 'Living map of the repo: describe your blocker and get the right skill.',
    summary:
      'Acts as a meta-routing skill. Describe where you are stuck in plain language—a raw idea, a flaky bug, a bloated session—and it maps out the exact command or sequence to run.',
    whenToUse: [
      'You are unsure which skill in the repository fits your current situation.',
      'You want a tailored 2- or 3-skill sequence for a multi-step engineering task.',
      'You are onboarding onto mattpocock/skills in your daily workflow.',
    ],
    workflowSteps: [
      'Reads your current stage (discovery, debugging, refactoring, delivery, or context).',
      'Cross-references the installed skills catalog and each skill’s preconditions.',
      'Recommends the optimal ordered track with a brief rationale.',
      'Hands you the exact starting prompt to unblock your session immediately.',
    ],
    examplePrompt:
      '/ask-matt We got a production race condition report and I am not sure whether to debug directly or map the module first.',
  },
  'setup-skills': {
    title: 'Repository Calibration',
    tagline: 'Teaches every other skill where your docs, issues, and conventions live.',
    summary:
      'Scans your project once to configure issue tracker paths, triage labels, test scripts, and docs/agents/ layout so the entire skill suite works out of the box.',
    whenToUse: [
      'The very first time you install the skills pack in a new repository.',
      'Whenever your team updates its documentation layout or issue label taxonomy.',
      'To avoid repeating repository-specific instructions in every agent session.',
    ],
    workflowSteps: [
      'Inspects package.json, folder layout, git remote, test scripts, and existing conventions.',
      'Identifies where specs, ADRs, and agent documentation should live.',
      'Configures triage label mappings and standard ticket formats.',
      'Saves local configuration automatically consumed by all other skills.',
    ],
    examplePrompt:
      '/setup-matt-pocock-skills Configure this monorepo using GitHub Issues and specs under docs/specs.',
  },
  tdd: {
    title: 'Red-Green-Refactor Loop',
    tagline: 'Enforces strict test-driven development one behavior at a time.',
    summary:
      'Applies classic TDD discipline to AI coding sessions: writes a single failing test for the right reason, implements the minimum code to pass, then refactors cleanly.',
    whenToUse: [
      'Critical business logic, parsers, state machines, or financial calculations.',
      'When an agent tends to write implementation-coupled tests instead of behavior tests.',
      'To build incremental confidence while shaping clean, minimal interfaces.',
    ],
    workflowSteps: [
      'Defines the next observable behavior and writes one failing test (Red).',
      'Confirms the test fails for the missing behavior rather than a syntax error.',
      'Writes the minimal production code required to turn the test green (Green).',
      'Refactors duplication while keeping the entire suite passing before the next cycle.',
    ],
    examplePrompt:
      '/tdd Implement the tiered discount calculator covering bracket boundaries and stackable coupons.',
  },
  diagnose: {
    title: 'Systematic Bug Diagnosis',
    tagline: 'Reproduces, tests hypotheses, and proves root cause before editing.',
    summary:
      'Prevents premature guesswork on tough bugs. Enforces a scientific investigation with deterministic reproduction, hypothesis probing, and mutation verification prior to fixing.',
    whenToUse: [
      'Intermittent bugs, subtle regressions, or failures where symptoms hide the root cause.',
      'When earlier quick fixes only masked the underlying defect.',
      'To lock down the fix permanently with a faithful regression test.',
    ],
    workflowSteps: [
      'Isolates the failure with a minimal, reliable reproduction case.',
      'Formulates falsifiable hypotheses and tests each against real runtime evidence.',
      'Verifies the exact root cause (including mutation checks) before writing the fix.',
      'Applies a surgical patch and commits a permanent automated regression test.',
    ],
    examplePrompt:
      '/diagnose Users in UTC-3 are getting billed twice right at the end-of-month boundary.',
  },
  architecture: {
    title: 'Deep-Module Refactoring',
    tagline: 'Surfaces structural friction and turns shallow modules into deep ones.',
    summary:
      'Runs an architectural audit inspired by John Ousterhout (A Philosophy of Software Design) to uncover leaky abstractions, high coupling, and testability bottlenecks.',
    whenToUse: [
      'Small feature edits force you to touch 8 files scattered across pass-through layers.',
      'Testing core domain logic requires dozens of brittle mocks.',
      'Your codebase grew rapidly and needs structural clarity before the next milestone.',
    ],
    workflowSteps: [
      'Maps module boundaries, circular dependencies, and shallow pass-through wrappers.',
      'Pinpoints high-leverage areas where consolidating ownership cuts complexity.',
      'Proposes deep interfaces with smaller public surface area and stronger testability.',
      'Outputs a safe, incremental refactoring roadmap.',
    ],
    examplePrompt:
      '/improve-codebase-architecture Audit src/billing and highlight where rules are leaking across shallow wrappers.',
  },
  wayfinder: {
    title: 'Codebase Wayfinding',
    tagline: 'Maps unfamiliar territory quickly and coordinates multi-session work.',
    summary:
      'Explores the codebase purposefully to build an accurate mental map of modules, entrypoints, and data flows before making changes in unfamiliar subsystems.',
    whenToUse: [
      'You just stepped into a legacy or unfamiliar area of the codebase.',
      'You need to trace where an entity is created, transformed, and persisted end-to-end.',
      'You are coordinating complex work that spans multiple subsystems.',
    ],
    workflowSteps: [
      'Traces entrypoints, routes, dependencies, and state boundaries in the actual code.',
      'Synthesizes a crisp map of responsibilities without dumping irrelevant code.',
      'Flags hidden couplings, invariants, and change-sensitive boundaries.',
      'Delivers a practical guide to start design or implementation safely.',
    ],
    examplePrompt:
      '/wayfinder Map the complete authentication and session refresh flow in this repository.',
  },
  prototype: {
    title: 'Rapid Exploration Prototype',
    tagline: 'Tests technical alternatives in isolated spikes before committing.',
    summary:
      'Lets you validate two or more technical or UX approaches in an isolated sandbox, collecting real evidence before formalizing the winning direction into a spec.',
    whenToUse: [
      'There is real uncertainty between two libraries, interaction models, or API shapes.',
      'You want something clickable in minutes to validate ergonomics with your team.',
      'You need to de-risk the hardest technical unknown before full engineering.',
    ],
    workflowSteps: [
      'Isolates the spike from critical production paths to keep changes reversible.',
      'Builds the minimum working slice required to test the core hypothesis.',
      'Documents findings, discovered constraints, and trade-offs for each option.',
      'Sets up a clean decision to discard the draft or promote it into /to-spec.',
    ],
    examplePrompt:
      '/prototype Build an isolated spike comparing drag-and-drop versus keyboard reordering on the ticket list.',
  },
  triage: {
    title: 'Issue Triage & Labeling',
    tagline: 'Classifies, prioritizes, and routes incoming issues to your schema.',
    summary:
      'Processes incoming issue reports against the real codebase and configured taxonomy, assigning severity, labels, likely duplicates, and recommended next skills.',
    whenToUse: [
      'Your issue inbox has piled up with incomplete or uncategorized reports.',
      'You need to separate real bugs, usage questions, and feature requests cleanly.',
      'You want clean, triaged issues ready for diagnosis or sprint planning.',
    ],
    workflowSteps: [
      'Reads the report and cross-checks relevant files and repository labels.',
      'Checks for missing reproduction info or drafts focused follow-up questions.',
      'Assigns category, priority, and technical area per local configuration.',
      'Recommends the next action (/diagnose, /grill-me, or backlog).',
    ],
    examplePrompt:
      '/triage Review the latest open issues around CSV export and propose labels and priorities.',
  },
  handoff: {
    title: 'Clean Session Handoff',
    tagline: 'Compacts a long session into a crisp brief for seamless continuation.',
    summary:
      'When your context window fills up or the workday ends mid-task, summarizes locked decisions, modified files, test status, and exact next steps for a fresh session.',
    whenToUse: [
      'The active thread has grown long enough that agent focus starts degrading.',
      'You need to pause today and pick back up tomorrow (or hand off to a teammate).',
      'You want a fresh context window with 100% of the signal and 0% of the noise.',
    ],
    workflowSteps: [
      'Captures current git state, locked architectural decisions, and ruled-out dead ends.',
      'Strips away discarded explorations and resolved errors that no longer matter.',
      'Generates a concise handoff document with an exact resume checklist.',
      'Prepares the opening prompt ready to paste into the next session.',
    ],
    examplePrompt:
      '/handoff Compact the current state of this migration so I can resume in a clean session tomorrow.',
  },
  'zoom-out': {
    title: 'Big-Picture Perspective',
    tagline: 'Steps back when you get stuck in low-level implementation details.',
    summary:
      'Breaks tunnel vision and reconnects current work to the broader system goal, surfacing simpler paths and highlighting where effort actually pays off.',
    whenToUse: [
      'You have been wrestling with an obscure detail for hours and lost the wider view.',
      'You suspect you are solving the wrong problem or over-engineering a simple need.',
      'You want a quick high-level mental model of a complex subsystem.',
    ],
    workflowSteps: [
      'Pauses immediate edits and restates the user or business goal above the code.',
      'Separates real hard constraints from self-imposed assumptions made mid-session.',
      'Presents a high-level view of involved modules and simpler alternatives.',
      'Helps you decide whether to stay the course, simplify, or pivot.',
    ],
    examplePrompt:
      '/zoom-out We are juggling 4 hooks just to sync this state — what is the bigger picture here?',
  },
  'write-a-skill': {
    title: 'Custom Skill Authoring',
    tagline: 'Turns your team’s recurring workflows into reusable agent skills.',
    summary:
      'Guides you in designing and authoring new skill files using progressive disclosure, crisp triggers, and clear guardrails so agents execute them reliably.',
    whenToUse: [
      'You notice yourself repeating the exact same instructions to agents every week.',
      'You want to encode team rituals (migrations, releases, design tokens) as commands.',
      'You want to extend or customize the skill pack for your repository.',
    ],
    workflowSteps: [
      'Defines the trigger condition, required inputs, and ideal output format.',
      'Structures instructions in lean layers to preserve context window budget.',
      'Adds explicit verification guardrails and boundaries where the skill should stop.',
      'Scaffolds the finished skill file inside your project’s skills directory.',
    ],
    examplePrompt:
      '/write-a-skill Create a /release-notes skill that reads this week’s merged PRs and drafts a user-facing changelog.',
  },
  retro: {
    title: 'Session Retrospective',
    tagline: 'Extracts concrete workflow and docs improvements after tough sessions.',
    summary:
      'Reviews where the agent stumbled during the task you just finished and produces a prioritized shortlist of doc, rule, script, or skill upgrades so next time runs smoothly.',
    whenToUse: [
      'After a bumpy session where you had to course-correct the agent repeatedly.',
      'To continuously sharpen your repository instructions and local test tooling.',
      'At the close of an important engineering milestone.',
    ],
    workflowSteps: [
      'Reviews friction points, failing commands, and misunderstandings from the thread.',
      'Distinguishes missing repo documentation from gaps in automated validation.',
      'Prioritizes 3 to 5 small, high-leverage improvements.',
      'Offers to apply the chosen upgrades directly to your docs or skills.',
    ],
    examplePrompt:
      '/retro Run a retro on this session and show what we should document so the agent stops breaking test mocks.',
  },
};

export const SKILL_TRANSLATIONS_ES: Record<string, SkillTranslation> = {
  'grill-me': {
    title: 'Interrogatorio de Diseño',
    tagline: 'Presiona cada rama de tu plan hasta eliminar cualquier ambigüedad.',
    summary:
      'Te entrevista de forma implacable sobre una idea, arquitectura o funcionalidad hasta resolver y documentar cada caso límite, compromiso y decisión crítica del árbol de diseño.',
    whenToUse: [
      'Tienes una idea prometedora, pero aún llena de suposiciones implícitas.',
      'Necesitas cerrar requisitos técnicos y decisiones de arquitectura (ADRs) antes de programar.',
      'Quieres evitar retrabajos costosos provocados por especificaciones vagas.',
    ],
    workflowSteps: [
      'Mapea el árbol de decisiones a partir de tu planteamiento inicial y la documentación del repo.',
      'Formula preguntas directas, una rama a la vez, con recomendaciones concretas basadas en el código.',
      'Cierra casos límite, reglas de negocio y restricciones de interfaz antes de avanzar.',
      'Consolida todas las respuestas en decisiones explícitas listas para convertirse en spec.',
    ],
    examplePrompt:
      '/grill-me Quiero añadir webhooks con reintento exponencial para eventos de facturación sin acoplarlos al checkout síncrono.',
  },
  'to-spec': {
    title: 'Conversión a Especificación',
    tagline: 'Transforma decisiones acordadas en una especificación formal y verificable.',
    summary:
      'Toma el consenso alcanzado en la conversación de diseño y lo cristaliza en un documento estructurado de requisitos (PRD/Spec) claro, comprobable y sin interpretaciones ambiguas.',
    whenToUse: [
      'Justo después de cerrar una sesión de /grill-me con todas las decisiones definidas.',
      'Cuando necesitas documentar contratos de API, estados de error y criterios de aceptación.',
      'Para crear la fuente única de verdad que guiará implementación y code review.',
    ],
    workflowSteps: [
      'Extrae decisiones, límites de alcance y no-objetivos de la conversación actual.',
      'Estructura el documento con problema, arquitectura, modelos de datos y casos límite.',
      'Define criterios objetivos de verificación que se exigirán en pruebas y revisión.',
      'Guarda la especificación siguiendo el formato de documentación del repositorio.',
    ],
    examplePrompt:
      '/to-spec Convierte las decisiones de esta conversación sobre webhooks en una spec lista para revisión técnica.',
  },
  'to-tickets': {
    title: 'División en Tickets',
    tagline: 'Divide una spec grande en tareas pequeñas, secuenciales y listas para agentes.',
    summary:
      'Descompone una especificación en entregas verticales independientes y manejables, con orden de dependencias, criterios de aceptación claros y alcance acotado.',
    whenToUse: [
      'La spec está lista, pero implementarla de una sola vez generaría un diff enorme.',
      'Quieres ejecutar tareas en secuencia controlada o delegar subtareas con contexto limpio.',
      'Necesitas registrar issues bien estructurados en el gestor de tu proyecto.',
    ],
    workflowSteps: [
      'Analiza la spec completa e identifica fronteras naturales de entrega incremental.',
      'Ordena las tareas en un grafo de dependencias (esquema → lógica de dominio → interfaz).',
      'Redacta cada ticket con un objetivo único, archivos probables y criterio verificable.',
      'Publica o exporta los tickets siguiendo las etiquetas y convenciones del repositorio.',
    ],
    examplePrompt:
      '/to-tickets Divide la spec de webhooks en tickets pequeños que se puedan implementar y probar uno por uno.',
  },
  implement: {
    title: 'Implementación Disciplinada',
    tagline: 'Ejecuta el ticket guiado por pruebas y fiel a la especificación.',
    summary:
      'Construye el código descrito en el ticket o spec con disciplina de ingeniería: lee el contexto existente, escribe pruebas primero cuando aplica y valida el resultado antes de cerrar.',
    whenToUse: [
      'Ya tienes un ticket o spec bien definido y quieres pasar a código funcional.',
      'Buscas commits limpios, tipado estricto y verificación automatizada continua.',
      'Quieres evitar que el agente invente abstracciones extra fuera del alcance acordado.',
    ],
    workflowSteps: [
      'Lee el ticket, la spec de referencia y módulos vecinos para respetar los patrones locales.',
      'Ejecuta ciclos incrementales de implementación validando tipos, lint y pruebas.',
      'Mantiene el diff estrictamente acotado a los criterios sin refactorizaciones no pedidas.',
      'Presenta un resumen objetivo de los cambios y las verificaciones que pasaron.',
    ],
    examplePrompt:
      '/implement Ejecuta el ticket #42 (cola de reintentos para webhooks) asegurando cobertura de pruebas unitarias.',
  },
  'code-review': {
    title: 'Revisión en Dos Ejes',
    tagline: 'Audita el diff frente a los estándares del repositorio y la fidelidad a la spec.',
    summary:
      'Evalúa cambios locales o recientes en dos frentes independientes: calidad estructural del código (code smells, seguridad, tipado) y cumplimiento exacto de la especificación.',
    whenToUse: [
      'Antes de abrir un Pull Request para detectar fallos sutiles en local.',
      'Para revisar código escrito por otra persona o por una sesión anterior de agente.',
      'Cuando quieres confirmar que ningún requisito o caso límite quedó fuera.',
    ],
    workflowSteps: [
      'Inspecciona el diff completo y lo contrasta con la spec o ticket asociado.',
      'Audita calidad: abstracciones con fugas, estados sin tratar, rendimiento y pruebas.',
      'Separa hallazgos bloqueantes de sugerencias menores para reducir ruido.',
      'Propone correcciones concretas y precisas para cada punto detectado.',
    ],
    examplePrompt:
      '/code-review Revisa mis cambios sin commit comparándolos con los criterios del ticket #42.',
  },
  pr: {
    title: 'Pull Request con Evidencia',
    tagline: 'Genera un PR claro, conciso y respaldado por el diff real y las pruebas.',
    summary:
      'Sintetiza el contexto del cambio, el porqué de las decisiones y el plan real de verificación en una descripción de Pull Request lista para aprobación rápida.',
    whenToUse: [
      'El código superó la revisión local y la suite de pruebas está en verde.',
      'Quieres evitar descripciones genéricas de PR que no explican impacto ni cómo probar.',
      'Deseas mantener trazabilidad limpia entre issue, spec y entrega.',
    ],
    workflowSteps: [
      'Analiza los commits de la rama, el diff final y las referencias de issues vinculadas.',
      'Redacta un resumen centrado en el comportamiento alterado y decisiones clave.',
      'Detalla evidencia real de pruebas y pasos prácticos de verificación manual.',
      'Entrega título y cuerpo listos para abrir o actualizar el PR.',
    ],
    examplePrompt:
      '/pr Prepara el título y la descripción del Pull Request para esta rama referenciando el ticket #42.',
  },
  'ask-matt': {
    title: 'Enrutador de Skills',
    tagline: 'Mapa vivo del repo: describe tu bloqueo y descubre qué skill usar.',
    summary:
      'Funciona como meta-skill orientador. Explicas en lenguaje natural dónde estás atascado —una idea cruda, un bug persistente, una sesión larga— y te indica el comando o ruta exacta.',
    whenToUse: [
      'No estás seguro de qué skill del repositorio encaja mejor con tu problema actual.',
      'Quieres armar una secuencia de 2 o 3 skills para una tarea compleja.',
      'Estás empezando a adoptar mattpocock/skills en tu flujo diario.',
    ],
    workflowSteps: [
      'Interpreta tu etapa actual (descubrimiento, bug, refactor, entrega o contexto).',
      'Consulta el catálogo completo de skills instalados y sus precondiciones.',
      'Devuelve la ruta recomendada en el orden ideal con justificación breve.',
      'Indica el primer prompt listo para desbloquear la sesión de inmediato.',
    ],
    examplePrompt:
      '/ask-matt Recibimos un reporte de condición de carrera en producción y no sé si depurar directo o mapear el módulo primero.',
  },
  'setup-skills': {
    title: 'Configuración del Repositorio',
    tagline: 'Enseña al resto de skills dónde viven tus docs, issues y convenciones.',
    summary:
      'Analiza la estructura de tu proyecto una sola vez para mapear el gestor de issues, etiquetas de triaje, scripts de prueba y carpeta docs/agents/.',
    whenToUse: [
      'La primera vez que instalas el paquete de skills en un repositorio nuevo.',
      'Cuando el equipo cambia su estructura de documentación o esquema de etiquetas.',
      'Para no repetir instrucciones del proyecto en cada conversación con el agente.',
    ],
    workflowSteps: [
      'Inspecciona package.json, directorios, git remote, scripts de prueba y convenciones.',
      'Identifica dónde deben almacenarse specs, ADRs y documentación para agentes.',
      'Configura el mapeo de etiquetas de triaje y el formato estándar de tickets.',
      'Guarda la configuración local consumida automáticamente por los demás skills.',
    ],
    examplePrompt:
      '/setup-matt-pocock-skills Configura este monorepo usando GitHub Issues y specs en docs/specs.',
  },
  tdd: {
    title: 'Ciclo Red-Green-Refactor',
    tagline: 'Impone desarrollo guiado por pruebas paso a paso.',
    summary:
      'Aplica la disciplina clásica de TDD con agentes de IA: escribe primero una prueba que falla por la razón correcta, implementa lo mínimo para pasar y luego refactoriza con seguridad.',
    whenToUse: [
      'Reglas de negocio críticas, parsers, máquinas de estado o cálculos financieros.',
      'Cuando el agente tiende a escribir pruebas acopladas a la implementación.',
      'Para construir confianza incremental mientras diseñas interfaces limpias.',
    ],
    workflowSteps: [
      'Define el siguiente comportamiento observable y escribe una sola prueba fallando (Red).',
      'Confirma que falla por el comportamiento ausente y no por un error de sintaxis.',
      'Escribe el código mínimo necesario para que la prueba pase (Green).',
      'Refactoriza duplicaciones manteniendo toda la suite verde antes del siguiente ciclo.',
    ],
    examplePrompt:
      '/tdd Implementa el calculador de descuentos progresivos cubriendo límites de tramo y cupones acumulables.',
  },
  diagnose: {
    title: 'Diagnóstico Sistemático de Bugs',
    tagline: 'Reproduce, prueba hipótesis y demuestra la causa raíz antes de editar.',
    summary:
      'Evita conjeturas apresuradas en bugs difíciles. Conduce una investigación científica con reproducción determinista, prueba de hipótesis y verificación por mutación antes de corregir.',
    whenToUse: [
      'Bugs intermitentes, regresiones sutiles o fallos donde el síntoma oculta la causa real.',
      'Cuando intentos rápidos anteriores solo maquillaron el error.',
      'Para asegurar que el bug no vuelva jamás con una prueba de regresión fiel.',
    ],
    workflowSteps: [
      'Aísla el problema construyendo un caso mínimo y confiable de reproducción.',
      'Formula hipótesis verificables y las contrasta con evidencia real de ejecución.',
      'Confirma la causa raíz exacta (incluyendo chequeo de mutación) antes de editar.',
      'Aplica la corrección quirúrgica y añade la prueba automatizada de regresión.',
    ],
    examplePrompt:
      '/diagnose Usuarios en zona UTC-3 están recibiendo un cobro duplicado en el cambio de mes.',
  },
  architecture: {
    title: 'Refactor hacia Módulos Profundos',
    tagline: 'Detecta fricción estructural y convierte módulos superficiales en profundos.',
    summary:
      'Realiza una auditoría arquitectónica inspirada en John Ousterhout (A Philosophy of Software Design) para detectar abstracciones filtradas, acoplamiento excesivo y cuellos de testabilidad.',
    whenToUse: [
      'Cambios pequeños obligan a tocar 8 archivos repartidos en capas pasamanos.',
      'Probar lógica de dominio exige decenas de mocks frágiles.',
      'La base creció rápido y necesita claridad estructural antes del próximo hito.',
    ],
    workflowSteps: [
      'Mapea fronteras entre módulos, dependencias cíclicas y wrappers superficiales.',
      'Señala puntos de alto impacto donde consolidar responsabilidad reduce complejidad.',
      'Propone interfaces profundas con menor superficie pública y mejor testabilidad.',
      'Crea un plan de refactorización seguro en etapas incrementales.',
    ],
    examplePrompt:
      '/improve-codebase-architecture Analiza src/billing y señala dónde estamos dispersando reglas en wrappers superficiales.',
  },
  wayfinder: {
    title: 'Navegación de Código y Contexto',
    tagline: 'Mapea territorios desconocidos rápido y coordina sesiones largas.',
    summary:
      'Explora el código con propósito para construir un mapa mental claro de módulos, puntos de entrada y flujos de datos antes de intervenir áreas poco conocidas.',
    whenToUse: [
      'Acabas de entrar en un módulo legado o desconocido del repositorio.',
      'Necesitas rastrear dónde nace, se transforma y se persiste una entidad de punta a punta.',
      'Coordinas trabajo complejo que atraviesa varios subsistemas.',
    ],
    workflowSteps: [
      'Rastrea puntos de entrada, rutas, dependencias y fronteras de estado en el código real.',
      'Sintetiza un mapa claro de responsabilidades sin volcar código irrelevante.',
      'Señala acoplamientos ocultos, invariantes y puntos sensibles al cambio.',
      'Entrega una guía directa para iniciar diseño o implementación con seguridad.',
    ],
    examplePrompt:
      '/wayfinder Mapea el flujo completo de autenticación y refresco de sesión en este repositorio.',
  },
  prototype: {
    title: 'Exploración Rápida de Prototipos',
    tagline: 'Valida alternativas técnicas en experimentos aislados antes de comprometerte.',
    summary:
      'Permite probar rápidamente dos o más enfoques técnicos o de UX en un espacio aislado, recogiendo evidencia práctica antes de formalizar la solución definitiva en una spec.',
    whenToUse: [
      'Existe incertidumbre real entre dos librerías, patrones de interacción o diseños de API.',
      'Quieres algo funcional en minutos para validar la ergonomía con el equipo.',
      'Necesitas reducir el riesgo técnico principal antes de la ingeniería completa.',
    ],
    workflowSteps: [
      'Aísla el experimento de las rutas críticas de producción para mantener reversibilidad.',
      'Construye lo mínimo necesario para validar la hipótesis técnica o visual central.',
      'Documenta hallazgos, limitaciones descubiertas y compromisos de cada opción.',
      'Prepara la decisión para descartar el borrador o evolucionarlo a /to-spec.',
    ],
    examplePrompt:
      '/prototype Crea un prototipo aislado comparando arrastrar y soltar frente a reordenar con teclado en la lista de tickets.',
  },
  triage: {
    title: 'Triaje y Clasificación de Issues',
    tagline: 'Clasifica, prioriza y enruta issues entrantes según tu esquema.',
    summary:
      'Procesa reportes entrantes contrastándolos con el código actual y la taxonomía configurada, asignando severidad, etiquetas correctas, posibles duplicados y siguiente paso.',
    whenToUse: [
      'La bandeja de issues creció con reportes incompletos o sin clasificar.',
      'Necesitas separar bugs reales, dudas de uso y solicitudes de mejora.',
      'Quieres preparar issues limpios antes de enviarlos a diagnóstico o planificación.',
    ],
    workflowSteps: [
      'Lee el reporte y lo contrasta con los archivos y etiquetas del repositorio.',
      'Verifica si falta contexto o redacta preguntas concretas para el autor.',
      'Asigna categoría, prioridad y área técnica según la configuración local.',
      'Sugiere el siguiente paso inmediato (/diagnose, /grill-me o backlog).',
    ],
    examplePrompt:
      '/triage Analiza los últimos issues abiertos sobre exportación CSV y sugiere etiquetas y prioridades.',
  },
  handoff: {
    title: 'Traspaso Limpio de Sesión',
    tagline: 'Compacta una sesión larga en un documento quirúrgico para continuar sin pérdidas.',
    summary:
      'Cuando la ventana de contexto se llena o termina la jornada a mitad de tarea, resume decisiones tomadas, archivos modificados, estado de pruebas y pasos exactos para retomar.',
    whenToUse: [
      'La conversación actual creció tanto que el agente empieza a perder foco.',
      'Necesitas pausar hoy y retomar mañana (o pasar la tarea a otra persona).',
      'Quieres abrir una ventana limpia conservando 100% de señal y 0% de ruido.',
    ],
    workflowSteps: [
      'Recoge el estado actual de git, decisiones arquitectónicas cerradas y vías descartadas.',
      'Elimina exploraciones descartables y errores antiguos ya superados.',
      'Genera un documento conciso con checklist exacto de reanudación inmediata.',
      'Deja el primer comando listo para pegar en la siguiente sesión.',
    ],
    examplePrompt:
      '/handoff Compacta el estado actual de esta migración para retomarla mañana en una sesión limpia.',
  },
  'zoom-out': {
    title: 'Visión Panorámica',
    tagline: 'Da un paso atrás cuando te pierdes en detalles de implementación.',
    summary:
      'Rompe la visión de túnel y reconecta el trabajo actual con el objetivo mayor del sistema, mostrando alternativas más simples y dónde realmente genera valor el esfuerzo.',
    whenToUse: [
      'Llevas horas peleando con un detalle oscuro y perdiste de vista el conjunto.',
      'Sospechas que estás resolviendo el problema equivocado o complicando algo simple.',
      'Quieres explicar rápido el contexto general de un subsistema complejo.',
    ],
    workflowSteps: [
      'Pausa las ediciones inmediatas y resume el objetivo de negocio por encima del código.',
      'Distingue restricciones reales de suposiciones autoimpuestas durante la sesión.',
      'Presenta una vista de alto nivel de los módulos implicados y rutas más simples.',
      'Te ayuda a decidir si continuar, simplificar o cambiar de enfoque.',
    ],
    examplePrompt:
      '/zoom-out Estamos coordinando 4 hooks distintos solo para sincronizar este estado — ¿cuál es la visión general aquí?',
  },
  'write-a-skill': {
    title: 'Creador de Nuevos Skills',
    tagline: 'Convierte flujos recurrentes de tu equipo en skills reutilizables.',
    summary:
      'Te ayuda a diseñar y redactar nuevos archivos de skill siguiendo divulgación progresiva, disparadores claros y reglas de verificación para que los agentes los ejecuten bien.',
    whenToUse: [
      'Notas que repites las mismas instrucciones al agente cada semana.',
      'Quieres codificar rituales del equipo (migraciones, releases, tokens) en comandos.',
      'Deseas ampliar o personalizar el conjunto de skills de tu repositorio.',
    ],
    workflowSteps: [
      'Define el disparador, las entradas necesarias y el formato de salida ideal.',
      'Estructura las instrucciones en capas breves para cuidar el presupuesto de contexto.',
      'Incluye guardrails de verificación y límites donde el skill debe detenerse.',
      'Crea el archivo listo dentro del directorio de skills del proyecto.',
    ],
    examplePrompt:
      '/write-a-skill Crea un skill /release-notes que lea los PRs de la semana y redacte un changelog orientado a usuarios.',
  },
  retro: {
    title: 'Retrospectiva de Sesión',
    tagline: 'Extrae mejoras concretas para tu entorno y docs tras sesiones difíciles.',
    summary:
      'Analiza dónde tropezó el agente durante la tarea recién terminada y genera una lista priorizada de ajustes en documentación, reglas, scripts o skills para la próxima vez.',
    whenToUse: [
      'Después de una entrega compleja en la que tuviste que corregir al agente varias veces.',
      'Para evolucionar continuamente las instrucciones del repositorio y las pruebas locales.',
      'Al cerrar un hito técnico importante.',
    ],
    workflowSteps: [
      'Revisa puntos de fricción, comandos fallidos y malentendidos de la sesión.',
      'Distingue falta de documentación en el repo de huecos en scripts de validación.',
      'Prioriza de 3 a 5 mejoras pequeñas de alto impacto inmediato.',
      'Ofrece aplicar las mejoras elegidas directamente en tus docs o skills.',
    ],
    examplePrompt:
      '/retro Haz una retrospectiva de esta sesión y dime qué deberíamos documentar para que el agente no rompa los mocks.',
  },
};

export const SCENARIO_TRANSLATIONS_EN: Record<string, ScenarioTranslation> = {
  'vague-idea': {
    label: 'Still a rough idea',
    situation:
      'I have a new feature idea, but several requirements and edge cases are still unresolved.',
    keywords: [
      'idea',
      'feature',
      'new',
      'plan',
      'design',
      'start',
      'requirement',
      'spec',
      'prd',
      'grill',
    ],
    rationale:
      'Start by eliminating hidden assumptions with /grill-me, formalize the agreement via /to-spec, then slice the work into small tickets with /to-tickets.',
  },
  'elusive-bug': {
    label: 'Hard-to-reproduce bug',
    situation:
      'We have an intermittent bug or production regression and I do not want to guess at fixes.',
    keywords: [
      'bug',
      'error',
      'failure',
      'production',
      'debug',
      'regression',
      'reproduce',
      'crash',
      'flaky',
      'fix',
    ],
    rationale:
      'Use /diagnose to prove the root cause with a reliable reproduction, lock in the behavior with /tdd, and audit the diff before merging via /code-review.',
  },
  'bloated-session': {
    label: 'Session got too long',
    situation:
      'The agent conversation grew huge, context is noisy, and I need to continue cleanly.',
    keywords: [
      'session',
      'context',
      'long',
      'compact',
      'continue',
      'pause',
      'tomorrow',
      'handoff',
      'window',
    ],
    rationale:
      'Generate a surgical summary with /handoff to spin up a fresh window, and run /wayfinder if the next session needs to reconnect surrounding modules.',
  },
  'shallow-architecture': {
    label: 'Shallow, brittle code',
    situation:
      'Every small change touches too many files and tests rely on fragile mocks.',
    keywords: [
      'architecture',
      'refactor',
      'code',
      'shallow',
      'coupling',
      'mock',
      'testability',
      'legacy',
      'modules',
    ],
    rationale:
      'Map real boundaries with /wayfinder, surface shallow wrappers via /improve-codebase-architecture, and turn the refactor plan into safe steps with /to-tickets.',
  },
  'ready-to-ship': {
    label: 'Spec ready to ship',
    situation:
      'The specification is already approved and I want to build, review, and open a clean PR.',
    keywords: [
      'implement',
      'deliver',
      'pr',
      'pull request',
      'review',
      'ship',
      'ticket',
      'deploy',
      'merge',
    ],
    rationale:
      'Execute the scope cleanly with /implement, run a dual-axis audit via /code-review, and wrap up with evidence-backed notes using /pr.',
  },
  'first-time-setup': {
    label: 'First time in a repo',
    situation:
      'I just installed Matt Pocock’s skills in a repository and want to calibrate everything properly.',
    keywords: [
      'install',
      'setup',
      'configure',
      'new repo',
      'first',
      'triage',
      'write skill',
      'team',
    ],
    rationale:
      'Run /setup-matt-pocock-skills once to map docs and issues, lean on /ask-matt day to day, and author team-specific commands with /write-a-skill.',
  },
};

export const SCENARIO_TRANSLATIONS_ES: Record<string, ScenarioTranslation> = {
  'vague-idea': {
    label: 'Idea aún difusa',
    situation:
      'Tengo una idea de funcionalidad nueva, pero varios detalles y casos límite siguen abiertos.',
    keywords: [
      'idea',
      'funcionalidad',
      'nuevo',
      'nueva',
      'planear',
      'diseno',
      'diseño',
      'empezar',
      'requisito',
      'spec',
      'prd',
    ],
    rationale:
      'Empieza eliminando suposiciones con /grill-me, formaliza el acuerdo en /to-spec y divide el trabajo en entregas pequeñas con /to-tickets.',
  },
  'elusive-bug': {
    label: 'Bug difícil de reproducir',
    situation:
      'Recibí un bug intermitente o regresión en producción y no quiero probar arreglos a ciegas.',
    keywords: [
      'bug',
      'error',
      'fallo',
      'produccion',
      'producción',
      'depurar',
      'debug',
      'regresion',
      'regresión',
      'reproducir',
    ],
    rationale:
      'Usa /diagnose para demostrar la causa raíz con una reproducción fiable, fija el comportamiento con /tdd y audita el diff antes del merge con /code-review.',
  },
  'bloated-session': {
    label: 'Sesión demasiado larga',
    situation:
      'La conversación con el agente se alargó mucho, el contexto está cargado y necesito continuar sin perder nada.',
    keywords: [
      'sesion',
      'sesión',
      'contexto',
      'larga',
      'compactar',
      'continuar',
      'pausar',
      'manana',
      'mañana',
      'handoff',
    ],
    rationale:
      'Genera un resumen quirúrgico con /handoff para abrir una ventana limpia y usa /wayfinder si la siguiente sesión necesita reconectar módulos vecinos.',
  },
  'shallow-architecture': {
    label: 'Código superficial y frágil',
    situation:
      'Cada cambio pequeño obliga a editar muchos archivos y las pruebas dependen de mocks frágiles.',
    keywords: [
      'arquitectura',
      'refactorizar',
      'codigo',
      'código',
      'superficial',
      'acoplamiento',
      'mock',
      'testabilidad',
      'legado',
      'modulos',
    ],
    rationale:
      'Mapea fronteras reales con /wayfinder, detecta módulos superficiales con /improve-codebase-architecture y convierte el plan en pasos seguros con /to-tickets.',
  },
  'ready-to-ship': {
    label: 'Spec lista para entregar',
    situation:
      'La especificación ya está validada y quiero implementar, revisar y abrir un Pull Request impecable.',
    keywords: [
      'implementar',
      'entregar',
      'pr',
      'pull request',
      'revisar',
      'ship',
      'ticket',
      'desplegar',
      'merge',
    ],
    rationale:
      'Ejecuta el alcance con disciplina en /implement, realiza la auditoría en dos ejes con /code-review y cierra con evidencia clara en /pr.',
  },
  'first-time-setup': {
    label: 'Primer uso en el repo',
    situation:
      'Acabo de instalar los skills de Matt Pocock en un repositorio y quiero calibrar todo bien.',
    keywords: [
      'instalar',
      'setup',
      'configurar',
      'nuevo repo',
      'primero',
      'triaje',
      'crear skill',
      'equipo',
    ],
    rationale:
      'Ejecuta /setup-matt-pocock-skills una vez para mapear docs e issues, usa /ask-matt en el día a día y crea comandos propios con /write-a-skill.',
  },
};
