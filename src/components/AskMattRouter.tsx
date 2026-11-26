import { useRef, useState, type RefObject } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Copy, Search, X } from 'lucide-react';
import {
  getLocalizedRouterScenarios,
  getLocalizedSkillById,
  matchScenarioByQuery,
  type Skill,
} from '../data/skills';
import { UI_COPY, type Locale } from '../data/i18n';
import { SkillIcon } from './SkillIcon';

interface AskMattRouterProps {
  locale: Locale;
  selectedScenarioId: string;
  onSelectScenario: (id: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  onInspectSkill: (skill: Skill) => void;
  copiedValue: string | null;
  onCopy: (text: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function AskMattRouter({
  locale,
  selectedScenarioId,
  onSelectScenario,
  query,
  onQueryChange,
  onInspectSkill,
  copiedValue,
  onCopy,
  inputRef,
}: AskMattRouterProps) {
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);
  const localInputRef = useRef<HTMLInputElement | null>(null);
  const resolvedInputRef = inputRef ?? localInputRef;

  const t = UI_COPY[locale];
  const scenarios = getLocalizedRouterScenarios(locale);

  const trimmedQuery = query.trim();
  const matchedScenario = trimmedQuery
    ? matchScenarioByQuery(trimmedQuery, locale)
    : null;

  const activeScenario =
    matchedScenario ??
    scenarios.find((s) => s.id === selectedScenarioId) ??
    scenarios[0];

  const isFallbackForUnmatchedQuery = Boolean(trimmedQuery && !matchedScenario);

  const recommendedSkills = activeScenario.recommendedSkillIds
    .map((id) => getLocalizedSkillById(id, locale))
    .filter((skill): skill is Skill => Boolean(skill));

  const firstSkill = recommendedSkills[0];

  return (
    <section
      id="roteador"
      className="border-b border-white/[0.08] bg-[#0D0E12] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: scenario picker & free-text input */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/[0.08]">
                <SkillIcon iconKey="ask-matt" active={true} size={20} />
              </div>
              <div>
                <p className="font-mono text-xs font-medium text-amber-400">
                  {t.router.kicker}
                </p>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[#F4F4F6] sm:text-3xl">
                  {t.router.heading}
                </h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#9A9DA8] sm:text-base">
              {t.router.description}
            </p>

            <div className="relative mt-6">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#717584]"
                aria-hidden="true"
              />
              <input
                ref={resolvedInputRef}
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={t.router.inputPlaceholder}
                aria-label={t.router.inputAria}
                className="h-11 w-full rounded-lg border border-white/[0.12] bg-[#0A0A0D] pr-10 pl-10 text-sm text-[#F4F4F6] placeholder-[#6B6F7D] transition-colors focus:border-amber-500/70 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label={t.router.clearAria}
                  className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#9A9DA8] transition-colors hover:bg-white/[0.06] hover:text-[#F4F4F6] cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-medium text-[#7E8290]">
                {t.router.frequentScenarios}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {scenarios.map((scenario) => {
                  const isActive =
                    !isFallbackForUnmatchedQuery &&
                    activeScenario.id === scenario.id;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => {
                        onQueryChange('');
                        onSelectScenario(scenario.id);
                      }}
                      className={`relative min-h-10 rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'border-amber-500/60 bg-amber-500/[0.1] text-[#F4F4F6]'
                          : 'border-white/[0.08] bg-[#121318] text-[#B6B9C4] hover:border-white/20 hover:text-[#F4F4F6]'
                      }`}
                    >
                      <span className="block truncate">{scenario.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column: animated recommended skill sequence */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-xl border border-white/[0.09] bg-[#121318] p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeScenario.id}-${locale}-${isFallbackForUnmatchedQuery ? 'fallback' : 'match'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
                    <div>
                      <p className="text-xs text-[#9A9DA8]">
                        {isFallbackForUnmatchedQuery ? (
                          <span>
                            {t.router.noDirectMatchPrefix}{' '}
                            <span className="text-[#F4F4F6]">"{trimmedQuery}"</span>{' '}
                            · {t.router.defaultSuggestion}
                          </span>
                        ) : (
                          <span>
                            {t.router.recommendedTrack} ·{' '}
                            <span className="font-mono text-amber-400 tabular-nums">
                              {recommendedSkills.length}{' '}
                              {recommendedSkills.length === 1
                                ? t.router.skillSingular
                                : t.router.skillPlural}
                            </span>
                          </span>
                        )}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-[#F4F4F6]">
                        {activeScenario.label}
                      </h3>
                    </div>

                    {firstSkill && (
                      <button
                        type="button"
                        onClick={() => onCopy(firstSkill.command)}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#0A0A0D] px-3.5 py-2 text-xs font-medium text-[#F4F4F6] transition-colors hover:border-amber-500/50 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {copiedValue === firstSkill.command ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                            <span className="text-amber-300">{t.hero.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-[#9A9DA8]" aria-hidden="true" />
                            <span>{t.router.startWith(firstSkill.command)}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#B6B9C4]">
                    {activeScenario.rationale}
                  </p>

                  <div className="mt-6 space-y-3">
                    {recommendedSkills.map((skill, idx) => {
                      const isHovered = hoveredStepId === skill.id;
                      return (
                        <motion.button
                          key={skill.id}
                          type="button"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.22,
                            delay: idx * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          whileHover={{ x: 4 }}
                          onClick={() => onInspectSkill(skill)}
                          onMouseEnter={() => setHoveredStepId(skill.id)}
                          onMouseLeave={() => setHoveredStepId(null)}
                          onFocus={() => setHoveredStepId(skill.id)}
                          onBlur={() => setHoveredStepId(null)}
                          className="group flex w-full items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#0A0A0D] p-4 text-left transition-colors duration-150 hover:border-amber-500/45 hover:bg-[#14161D] cursor-pointer"
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <span className="font-mono text-xs font-medium text-amber-400 tabular-nums shrink-0">
                              0{idx + 1}
                            </span>

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#121318] transition-colors group-hover:border-amber-500/35">
                              <SkillIcon
                                iconKey={skill.iconKey}
                                active={isHovered}
                                size={22}
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <code className="font-mono text-sm font-medium text-[#F4F4F6] transition-colors group-hover:text-amber-300">
                                  {skill.command}
                                </code>
                                <span className="text-xs text-[#7E8290]">
                                  {skill.title}
                                </span>
                              </div>
                              <p className="mt-1 truncate text-xs text-[#9A9DA8] sm:whitespace-normal">
                                {skill.tagline}
                              </p>
                            </div>
                          </div>

                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-[#717584] transition-transform duration-150 group-hover:translate-x-1 group-hover:text-amber-400"
                            aria-hidden="true"
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
