import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Copy } from 'lucide-react';
import { getLocalizedIdeaToShipSkills, type Skill } from '../data/skills';
import { UI_COPY, type Locale } from '../data/i18n';
import { SkillIcon } from './SkillIcon';

interface IdeaToShipFlowProps {
  locale: Locale;
  activeStepId: string;
  onSelectStep: (id: string) => void;
  onInspectSkill: (skill: Skill) => void;
  copiedValue: string | null;
  onCopy: (text: string) => void;
}

export function IdeaToShipFlow({
  locale,
  activeStepId,
  onSelectStep,
  onInspectSkill,
  copiedValue,
  onCopy,
}: IdeaToShipFlowProps) {
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);
  const t = UI_COPY[locale].flow;
  const flowSkills = getLocalizedIdeaToShipSkills(locale);

  const activeIndex = Math.max(
    0,
    flowSkills.findIndex((skill) => skill.id === activeStepId)
  );
  const activeSkill = flowSkills[activeIndex];
  const progressRatio = activeIndex / Math.max(1, flowSkills.length - 1);

  const handleStepDelta = (delta: number) => {
    const nextIdx =
      (activeIndex + delta + flowSkills.length) % flowSkills.length;
    onSelectStep(flowSkills[nextIdx].id);
  };

  return (
    <section id="fluxo" className="border-b border-white/[0.08] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-amber-400 tabular-nums">
              {t.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F4F6] sm:text-4xl">
              {t.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#9A9DA8]">
              {t.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleStepDelta(-1)}
              aria-label={t.prevStageAria}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-[#121318] text-[#F4F4F6] transition-colors hover:border-white/25 hover:bg-[#171921] cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="min-w-[4.5rem] text-center font-mono text-xs text-[#9A9DA8] tabular-nums">
              0{activeIndex + 1} / 0{flowSkills.length}
            </span>
            <button
              type="button"
              onClick={() => handleStepDelta(1)}
              aria-label={t.nextStageAria}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-[#121318] text-[#F4F4F6] transition-colors hover:border-white/25 hover:bg-[#171921] cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Interactive animated timeline spine */}
        <div className="relative mt-12">
          {/* Desktop horizontal connector track */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-10 left-10 hidden h-px bg-white/[0.08] lg:block"
          >
            <motion.div
              className="h-full origin-left bg-amber-500"
              initial={false}
              animate={{ scaleX: progressRatio }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            />
          </div>

          <div
            role="tablist"
            aria-label={t.tablistAria}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6"
          >
            {flowSkills.map((skill, idx) => {
              const isSelected = skill.id === activeSkill.id;
              const isCompleted = idx < activeIndex;
              const isHovered = hoveredStepId === skill.id;
              const iconActive = isSelected || isHovered;

              return (
                <motion.button
                  key={skill.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectStep(skill.id)}
                  onMouseEnter={() => setHoveredStepId(skill.id)}
                  onMouseLeave={() => setHoveredStepId(null)}
                  onFocus={() => setHoveredStepId(skill.id)}
                  onBlur={() => setHoveredStepId(null)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col items-start rounded-xl border p-4 text-left transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-amber-500/60 bg-[#171921]'
                      : 'border-white/[0.08] bg-[#121318] hover:border-white/20 hover:bg-[#151720]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="flow-active-frame"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-amber-500/50"
                    />
                  )}

                  <div className="relative z-10 flex w-full items-center justify-between gap-2">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-150 ${
                        isSelected
                          ? 'border-amber-500/40 bg-amber-500/[0.1]'
                          : isCompleted
                            ? 'border-amber-500/25 bg-[#0A0A0D]'
                            : 'border-white/[0.08] bg-[#0A0A0D] group-hover:border-white/20'
                      }`}
                    >
                      <SkillIcon iconKey={skill.iconKey} active={iconActive} size={22} />
                    </div>
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isSelected || isCompleted
                          ? 'text-amber-400'
                          : 'text-[#717584]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="relative z-10 mt-4">
                    <code
                      className={`block font-mono text-sm font-medium transition-colors ${
                        isSelected
                          ? 'text-amber-300'
                          : 'text-[#F4F4F6] group-hover:text-amber-200'
                      }`}
                    >
                      {skill.command}
                    </code>
                    <span className="mt-1 block text-xs leading-snug text-[#9A9DA8]">
                      {skill.title}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active stage contextual panel */}
        <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.09] bg-[#121318]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSkill.id}-${locale}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-12 lg:p-8"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs text-[#9A9DA8] tabular-nums">
                  <span className="font-mono text-amber-400">
                    {t.stageLabel(activeSkill.stageNumber ?? 1)}
                  </span>
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <span>{activeSkill.categoryLabel}</span>
                  {activeSkill.aliases && activeSkill.aliases.length > 0 && (
                    <>
                      <span aria-hidden="true" className="text-white/25">
                        ·
                      </span>
                      <span className="font-mono text-[#7E8290]">
                        {t.alsoKnownAs} {activeSkill.aliases.join(', ')}
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-[#F4F4F6]">
                    {activeSkill.title}
                  </h3>
                  <code className="font-mono text-sm font-medium text-amber-400">
                    {activeSkill.command}
                  </code>
                </div>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#B6B9C4]">
                  {activeSkill.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onInspectSkill(activeSkill)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#0A0A0D] transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{t.inspectCta}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onCopy(activeSkill.command)}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/[0.12] bg-[#0A0A0D] px-4 py-2 text-xs font-medium text-[#F4F4F6] transition-colors hover:border-amber-500/40 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedValue === activeSkill.command ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                        <span className="text-amber-300">{t.copiedCommand}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#9A9DA8]" aria-hidden="true" />
                        <span>{t.copyCommand(activeSkill.command)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <p className="text-xs font-medium text-[#9A9DA8]">
                  {t.whatHappensHeading}
                </p>
                <ol className="mt-4 space-y-3">
                  {activeSkill.workflowSteps.slice(0, 3).map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#D0D2DA]"
                    >
                      <span className="mt-0.5 font-mono text-xs text-amber-400 tabular-nums">
                        0{i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
