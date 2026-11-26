import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import {
  getLocalizedSkills,
  type Skill,
  type SkillCategory,
} from '../data/skills';
import { UI_COPY, type Locale } from '../data/i18n';
import { SkillCard } from './SkillCard';

interface SkillCatalogProps {
  locale: Locale;
  activeCategory: 'all' | SkillCategory;
  onSelectCategory: (category: 'all' | SkillCategory) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  copiedValue: string | null;
  onCopy: (text: string) => void;
  onInspectSkill: (skill: Skill) => void;
}

export function SkillCatalog({
  locale,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  copiedValue,
  onCopy,
  onInspectSkill,
}: SkillCatalogProps) {
  const t = UI_COPY[locale];
  const localizedSkills = getLocalizedSkills(locale);

  const normalizedQuery = searchQuery
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const filteredSkills = localizedSkills.filter((skill) => {
    const matchesCategory =
      activeCategory === 'all' || skill.category === activeCategory;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const haystack = [
      skill.command,
      ...(skill.aliases ?? []),
      skill.title,
      skill.tagline,
      skill.summary,
      skill.categoryLabel,
    ]
      .join(' ')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return haystack.includes(normalizedQuery);
  });

  const handleResetFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
  };

  return (
    <section id="catalogo" className="border-b border-white/[0.08] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-amber-400">
              {t.catalog.kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F4F6] sm:text-4xl">
              {t.catalog.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#9A9DA8]">
              {t.catalog.description}
            </p>
          </div>

          <p className="font-mono text-xs text-[#9A9DA8] tabular-nums shrink-0">
            {t.catalog.showingPrefix}{' '}
            <span className="font-semibold text-[#F4F4F6]">
              {String(filteredSkills.length).padStart(2, '0')}
            </span>{' '}
            {t.catalog.showingOf}{' '}
            <span className="text-[#F4F4F6]">
              {String(localizedSkills.length).padStart(2, '0')}
            </span>{' '}
            {t.catalog.showingSuffix}
          </p>
        </div>

        {/* Filter bar: segmented category controls + instant search */}
        <div className="mt-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div
            role="tablist"
            aria-label={t.catalog.filterTabsAria}
            className="flex flex-wrap items-center gap-1 rounded-xl border border-white/[0.08] bg-[#121318] p-1"
          >
            {t.categoryTabs.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectCategory(category.id)}
                  className={`relative min-h-9 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'text-[#0A0A0D]'
                      : 'text-[#9A9DA8] hover:text-[#F4F4F6]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="catalog-category-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-amber-500"
                    />
                  )}
                  <span className="relative z-10">{category.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#717584]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              aria-label={t.catalog.searchAria}
              className="h-11 w-full rounded-xl border border-white/[0.1] bg-[#121318] pr-10 pl-10 text-sm text-[#F4F4F6] placeholder-[#6B6F7D] transition-colors focus:border-amber-500/70 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label={t.catalog.clearSearchAria}
                className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#9A9DA8] transition-colors hover:bg-white/[0.06] hover:text-[#F4F4F6] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Responsive skills grid */}
        {filteredSkills.length > 0 ? (
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  locale={locale}
                  skill={skill}
                  copiedValue={copiedValue}
                  onCopy={onCopy}
                  onInspect={onInspectSkill}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#121318] px-6 py-14 text-center">
            <p className="font-display text-lg font-semibold text-[#F4F4F6]">
              {t.catalog.emptyTitle}
            </p>
            <p className="mt-2 text-sm text-[#9A9DA8]">
              {t.catalog.emptyHintPrefix}{' '}
              <code className="font-mono text-[#F4F4F6]">/tdd</code>{' '}
              {t.catalog.emptyHintOr}{' '}
              <code className="font-mono text-[#F4F4F6]">/handoff</code>
              {t.catalog.emptyHintSuffix}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#0A0A0D] transition-colors hover:bg-amber-400 cursor-pointer"
            >
              {t.catalog.resetFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
