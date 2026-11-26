import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Check, Copy, ExternalLink } from 'lucide-react';
import { INSTALL_COMMANDS } from '../data/skills';
import { UI_COPY, type Locale } from '../data/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeroSectionProps {
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
  copiedValue: string | null;
  onCopy: (text: string) => void;
  onExploreFlow: () => void;
}

export function HeroSection({
  locale,
  onChangeLocale,
  copiedValue,
  onCopy,
  onExploreFlow,
}: HeroSectionProps) {
  const [installTab, setInstallTab] = useState<'claude' | 'npx'>('claude');
  const t = UI_COPY[locale];
  const activeInstallCommand = INSTALL_COMMANDS[installTab].command;
  const activeInstallDescription =
    installTab === 'claude'
      ? t.install.claudeDescription
      : t.install.npxDescription;
  const isCopied = copiedValue === activeInstallCommand;

  return (
    <section
      id="topo"
      className="relative overflow-hidden border-b border-white/[0.08] bg-editorial-grid"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-amber-500/[0.06] via-transparent to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-20 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
          <p className="text-sm font-medium text-[#9A9DA8]">
            <span>github.com/mattpocock/skills</span>
            <span className="mx-2 text-white/25" aria-hidden="true">
              ·
            </span>
            <span className="text-amber-400">Skills for Real Engineers</span>
          </p>

          <LanguageSwitcher
            locale={locale}
            onChangeLocale={onChangeLocale}
            layoutId="hero-locale-pill"
          />
        </div>

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h1 className="font-display text-[clamp(2.35rem,4.4vw,3.9rem)] leading-[1.06] font-semibold tracking-tight text-[#F4F4F6]">
              {t.hero.headline}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9A9DA8] sm:text-lg">
              {t.hero.leadPrefix}{' '}
              <code className="font-mono text-[0.92em] text-[#F4F4F6]">
                /ask-matt
              </code>{' '}
              {t.hero.leadSuffix}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreFlow}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-[#0A0A0D] transition-colors duration-150 hover:bg-amber-400 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="https://github.com/mattpocock/skills"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.12] bg-[#121318] px-5 py-2.5 text-sm font-medium text-[#F4F4F6] transition-colors duration-150 hover:border-white/25 hover:bg-[#171921] whitespace-nowrap shrink-0"
              >
                <span>{t.hero.githubCta}</span>
                <ExternalLink className="h-4 w-4 text-[#9A9DA8]" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-white/[0.09] bg-[#121318] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                <span className="text-sm font-medium text-[#F4F4F6]">
                  {t.hero.quickInstallTitle}
                </span>
                <div
                  role="tablist"
                  aria-label={t.hero.installMethodAria}
                  className="inline-flex rounded-lg border border-white/[0.08] bg-[#0A0A0D] p-1"
                >
                  {(['claude', 'npx'] as const).map((tabKey) => {
                    const selected = installTab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setInstallTab(tabKey)}
                        className={`relative rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selected
                            ? 'text-[#0A0A0D]'
                            : 'text-[#9A9DA8] hover:text-[#F4F4F6]'
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="hero-install-tab"
                            transition={{
                              type: 'spring',
                              stiffness: 460,
                              damping: 32,
                            }}
                            className="absolute inset-0 rounded-md bg-amber-500"
                          />
                        )}
                        <span className="relative z-10">
                          {tabKey === 'claude' ? 'Claude Code' : 'npx / Cursor'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-[#0A0A0D] px-4 py-3.5">
                <code className="overflow-x-auto font-mono text-xs text-[#F4F4F6] sm:text-sm">
                  {activeInstallCommand}
                </code>
                <button
                  type="button"
                  onClick={() => onCopy(activeInstallCommand)}
                  aria-label={t.hero.copyCommandAria(activeInstallCommand)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-white/[0.1] bg-[#171921] px-3 py-1.5 text-xs font-medium text-[#F4F4F6] transition-colors hover:border-amber-500/50 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                      <span className="text-amber-300">{t.hero.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#9A9DA8]" aria-hidden="true" />
                      <span>{t.hero.copy}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#9A9DA8]">
                {activeInstallDescription}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.07] pt-4 text-xs text-[#9A9DA8] tabular-nums">
                <span>
                  <strong className="font-mono font-semibold text-[#F4F4F6]">18</strong>{' '}
                  {t.hero.stats.skills}
                </span>
                <span aria-hidden="true" className="text-white/25">
                  ·
                </span>
                <span>
                  <strong className="font-mono font-semibold text-[#F4F4F6]">06</strong>{' '}
                  {t.hero.stats.stages}
                </span>
                <span aria-hidden="true" className="text-white/25">
                  ·
                </span>
                <span>
                  <strong className="font-mono font-semibold text-[#F4F4F6]">04</strong>{' '}
                  {t.hero.stats.categories}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
