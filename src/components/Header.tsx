import { UI_COPY, type Locale } from '../data/i18n';

interface HeaderProps {
  locale: Locale;
  onOpenRouter: () => void;
}

export function Header({ locale, onOpenRouter }: HeaderProps) {
  const t = UI_COPY[locale].nav;

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0A0A0D]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        <a
          href="#topo"
          className="font-display text-base font-semibold tracking-tight text-[#F4F4F6] transition-colors hover:text-amber-400 whitespace-nowrap shrink-0"
        >
          Matt Pocock Skills
        </a>

        <nav
          aria-label={t.ariaLabel}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9A9DA8]"
        >
          <a
            href="#fluxo"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#F4F4F6]"
          >
            {t.flow}
          </a>
          <a
            href="#roteador"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#F4F4F6]"
          >
            {t.router}
          </a>
          <a
            href="#catalogo"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#F4F4F6]"
          >
            {t.catalog}
          </a>
          <a
            href="#instalacao"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-[#F4F4F6]"
          >
            {t.install}
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenRouter}
            className="min-h-10 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#0A0A0D] transition-colors duration-150 hover:bg-amber-400 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </header>
  );
}
