import { Check, Copy, ExternalLink } from 'lucide-react';
import { INSTALL_COMMANDS } from '../data/skills';
import { UI_COPY, type Locale } from '../data/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface InstallSectionProps {
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
  copiedValue: string | null;
  onCopy: (text: string) => void;
}

export function InstallSection({
  locale,
  onChangeLocale,
  copiedValue,
  onCopy,
}: InstallSectionProps) {
  const t = UI_COPY[locale];

  const installCards = [
    {
      index: '01',
      key: 'claude' as const,
      label: t.install.claudeLabel,
      description: t.install.claudeDescription,
      command: INSTALL_COMMANDS.claude.command,
    },
    {
      index: '02',
      key: 'npx' as const,
      label: t.install.npxLabel,
      description: t.install.npxDescription,
      command: INSTALL_COMMANDS.npx.command,
    },
    {
      index: '03',
      key: 'setup' as const,
      label: t.install.setupLabel,
      description: t.install.setupDescription,
      command: INSTALL_COMMANDS.setup.command,
    },
  ];

  return (
    <>
      <section
        id="instalacao"
        className="border-b border-white/[0.08] bg-[#0D0E12] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-amber-400">
              {t.install.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F4F6] sm:text-4xl">
              {t.install.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#9A9DA8]">
              {t.install.description}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {installCards.map((card) => {
              const isCopied = copiedValue === card.command;
              return (
                <div
                  key={card.key}
                  className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#121318] p-6"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#7E8290] tabular-nums">
                      <span className="font-mono text-amber-400">{card.index}</span>
                      <span aria-hidden="true" className="text-white/25">
                        ·
                      </span>
                      <span className="font-medium text-[#F4F4F6]">{card.label}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#9A9DA8]">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-[#0A0A0D] px-3.5 py-3">
                    <code className="overflow-x-auto font-mono text-xs text-[#F4F4F6]">
                      {card.command}
                    </code>
                    <button
                      type="button"
                      onClick={() => onCopy(card.command)}
                      aria-label={t.hero.copyCommandAria(card.command)}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-md border border-white/[0.1] bg-[#171921] px-2.5 py-1 text-xs font-medium text-[#F4F4F6] transition-colors hover:border-amber-500/50 hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 text-xs text-[#7E8290] sm:flex-row sm:items-center lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display font-semibold text-[#F4F4F6]">
              Matt Pocock Skills
            </span>
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            <span>{t.install.footerTagline}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <LanguageSwitcher
              locale={locale}
              onChangeLocale={onChangeLocale}
              layoutId="footer-locale-pill"
            />
            <a
              href="https://github.com/mattpocock/skills"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#9A9DA8] transition-colors hover:text-amber-400 whitespace-nowrap shrink-0"
            >
              <span>github.com/mattpocock/skills</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
