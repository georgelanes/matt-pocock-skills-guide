import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Copy, ExternalLink, X } from 'lucide-react';
import { getLocalizedSkillById, type Skill } from '../data/skills';
import { UI_COPY, type Locale } from '../data/i18n';
import { SkillIcon } from './SkillIcon';

interface SkillDetailDrawerProps {
  locale: Locale;
  skill: Skill | null;
  copiedValue: string | null;
  onCopy: (text: string) => void;
  onClose: () => void;
  onSelectSkill: (skill: Skill) => void;
}

export function SkillDetailDrawer({
  locale,
  skill,
  copiedValue,
  onCopy,
  onClose,
  onSelectSkill,
}: SkillDetailDrawerProps) {
  const t = UI_COPY[locale];

  useEffect(() => {
    if (!skill) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, onClose]);

  const relatedSkills = skill
    ? skill.relatedSkillIds
        .map((id) => getLocalizedSkillById(id, locale))
        .filter((item): item is Skill => Boolean(item))
    : [];

  return (
    <AnimatePresence>
      {skill && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-skill-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Slide-over panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-white/[0.1] bg-[#101116] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/35 bg-amber-500/[0.08]">
                  <SkillIcon iconKey={skill.iconKey} active={true} size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#9A9DA8] tabular-nums">
                    <span>{skill.categoryLabel}</span>
                    {typeof skill.stageNumber === 'number' && (
                      <>
                        <span aria-hidden="true" className="text-white/25">
                          ·
                        </span>
                        <span className="font-mono text-amber-400">
                          {t.drawer.stagePrefix}
                          {skill.stageNumber}
                        </span>
                      </>
                    )}
                  </div>
                  <h2
                    id="drawer-skill-title"
                    className="mt-1 truncate font-display text-xl font-semibold tracking-tight text-[#F4F4F6]"
                  >
                    {skill.title}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t.drawer.closeAria}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] bg-[#171921] text-[#9A9DA8] transition-colors hover:border-white/25 hover:text-[#F4F4F6] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Primary copyable command block */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.09] bg-[#0A0A0D] px-4 py-3.5">
                <div className="min-w-0">
                  <code className="block font-mono text-base font-semibold text-amber-400">
                    {skill.command}
                  </code>
                  {skill.aliases && skill.aliases.length > 0 && (
                    <span className="mt-0.5 block font-mono text-xs text-[#7E8290]">
                      {t.drawer.aliasPrefix} {skill.aliases.join(', ')}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onCopy(skill.command)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-semibold text-[#0A0A0D] transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedValue === skill.command ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.hero.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.drawer.copyCommand}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#C4C7D2] sm:text-base">
                {skill.summary}
              </p>

              {/* When to use */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <h3 className="font-display text-sm font-semibold text-[#F4F4F6]">
                  {t.drawer.whenToUse}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {skill.whenToUse.map((trigger) => (
                    <li
                      key={trigger}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#9A9DA8]"
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-amber-400/80 select-none"
                      >
                        —
                      </span>
                      <span>{trigger}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Workflow steps */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <h3 className="font-display text-sm font-semibold text-[#F4F4F6]">
                  {t.drawer.whatAgentDoes}
                </h3>
                <ol className="mt-3 space-y-3">
                  {skill.workflowSteps.map((step, idx) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#D0D2DA]"
                    >
                      <span className="mt-0.5 font-mono text-xs text-amber-400 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Example prompt */}
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-sm font-semibold text-[#F4F4F6]">
                    {t.drawer.examplePrompt}
                  </h3>
                  <button
                    type="button"
                    onClick={() => onCopy(skill.examplePrompt)}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-white/[0.1] bg-[#171921] px-2.5 py-1 text-xs font-medium text-[#F4F4F6] transition-colors hover:border-amber-500/45 hover:text-amber-300 cursor-pointer"
                  >
                    {copiedValue === skill.examplePrompt ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                        <span className="text-amber-300">{t.drawer.promptCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#9A9DA8]" aria-hidden="true" />
                        <span>{t.drawer.copyPrompt}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#0A0A0D] p-4 font-mono text-xs leading-relaxed text-[#D6D8E0]">
                  {skill.examplePrompt}
                </div>
              </div>

              {/* Related skills navigation */}
              {relatedSkills.length > 0 && (
                <div className="mt-7 border-t border-white/[0.08] pt-6">
                  <h3 className="font-display text-sm font-semibold text-[#F4F4F6]">
                    {t.drawer.connectedSkills}
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {relatedSkills.map((related) => (
                      <button
                        key={related.id}
                        type="button"
                        onClick={() => onSelectSkill(related)}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-[#0A0A0D] px-3.5 py-3 text-left transition-colors hover:border-amber-500/45 hover:bg-[#151720] cursor-pointer"
                      >
                        <div className="min-w-0">
                          <code className="block truncate font-mono text-xs font-medium text-[#F4F4F6] group-hover:text-amber-300">
                            {related.command}
                          </code>
                          <span className="mt-0.5 block truncate text-xs text-[#7E8290]">
                            {related.title}
                          </span>
                        </div>
                        <ArrowRight
                          className="h-3.5 w-3.5 shrink-0 text-[#717584] transition-transform group-hover:translate-x-0.5 group-hover:text-amber-400"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer footer */}
            <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] bg-[#0C0D11] px-6 py-4">
              <a
                href={skill.githubPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9A9DA8] transition-colors hover:text-amber-400"
              >
                <span>{t.drawer.viewOnGithub}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="min-h-9 rounded-lg border border-white/[0.12] bg-[#171921] px-4 py-1.5 text-xs font-medium text-[#F4F4F6] transition-colors hover:border-white/25 cursor-pointer"
              >
                {t.drawer.close}
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
