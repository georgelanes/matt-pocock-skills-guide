import { motion } from 'motion/react';
import { LOCALE_OPTIONS, UI_COPY, type Locale } from '../data/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
  layoutId?: string;
}

export function LanguageSwitcher({
  locale,
  onChangeLocale,
  layoutId = 'active-locale-pill',
}: LanguageSwitcherProps) {
  const t = UI_COPY[locale];

  return (
    <div
      role="group"
      aria-label={t.languageSelectorLabel}
      className="inline-flex items-center rounded-lg border border-white/[0.1] bg-[#121318] p-1"
    >
      {LOCALE_OPTIONS.map((option) => {
        const isSelected = option.id === locale;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChangeLocale(option.id)}
            aria-pressed={isSelected}
            aria-label={option.nativeLabel}
            className={`relative min-h-8 rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isSelected
                ? 'text-[#0A0A0D]'
                : 'text-[#9A9DA8] hover:text-[#F4F4F6]'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 460, damping: 32 }}
                className="absolute inset-0 rounded-md bg-amber-500"
              />
            )}
            <span className="relative z-10">{option.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
