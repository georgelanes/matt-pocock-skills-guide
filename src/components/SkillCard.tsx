import { useState, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import type { Skill } from '../data/skills';
import { UI_COPY, type Locale } from '../data/i18n';
import { SkillIcon } from './SkillIcon';

interface SkillCardProps {
  locale: Locale;
  skill: Skill;
  copiedValue: string | null;
  onCopy: (text: string) => void;
  onInspect: (skill: Skill) => void;
}

export function SkillCard({
  locale,
  skill,
  copiedValue,
  onCopy,
  onInspect,
}: SkillCardProps) {
  const [isActive, setIsActive] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const t = UI_COPY[locale];

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(245, 158, 11, 0.12), transparent 72%)`;

  const isCopied = copiedValue === skill.command;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={() => onInspect(skill)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect(skill);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={t.catalog.card.inspectAria(skill.command, skill.title)}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#121318] p-6 text-left transition-colors duration-150 hover:border-amber-500/40 cursor-pointer"
    >
      {/* Pointer-following subtle specular radial sheen */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/[0.09] bg-[#0A0A0D] transition-colors duration-150 group-hover:border-amber-500/40 group-hover:bg-[#171921]">
            <SkillIcon iconKey={skill.iconKey} active={isActive} size={24} />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCopy(skill.command);
            }}
            aria-label={t.hero.copyCommandAria(skill.command)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#0A0A0D]/90 px-2.5 py-1.5 text-xs font-medium text-[#9A9DA8] transition-colors hover:border-amber-500/50 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                <span className="text-amber-300">{t.hero.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.hero.copy}</span>
              </>
            )}
          </button>
        </div>

        {/* Clean unboxed metadata (zero-pill discipline) */}
        <div className="mt-5 flex items-center gap-2 text-xs text-[#7E8290] tabular-nums">
          <span>{skill.categoryLabel}</span>
          {typeof skill.stageNumber === 'number' && (
            <>
              <span aria-hidden="true" className="text-white/20">
                ·
              </span>
              <span className="font-mono text-amber-400/90">
                {t.catalog.card.stagePrefix}
                {skill.stageNumber}
              </span>
            </>
          )}
        </div>

        <code className="mt-2 block font-mono text-base font-medium text-[#F4F4F6] transition-colors duration-150 group-hover:text-amber-300">
          {skill.command}
        </code>

        <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-[#E4E6EC]">
          {skill.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-[#9A9DA8]">
          {skill.tagline}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs font-medium text-[#9A9DA8] transition-colors group-hover:text-[#F4F4F6]">
        <span>{t.catalog.card.inspectLink}</span>
        <ArrowUpRight
          className="h-4 w-4 text-[#717584] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
