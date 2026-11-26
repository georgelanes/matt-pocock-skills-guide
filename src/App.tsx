import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  IDEA_TO_SHIP_SKILLS,
  ROUTER_SCENARIOS,
  getLocalizedSkillById,
  type Skill,
  type SkillCategory,
} from './data/skills';
import { LOCALE_OPTIONS, type Locale } from './data/i18n';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IdeaToShipFlow } from './components/IdeaToShipFlow';
import { AskMattRouter } from './components/AskMattRouter';
import { SkillCatalog } from './components/SkillCatalog';
import { InstallSection } from './components/InstallSection';
import { SkillDetailDrawer } from './components/SkillDetailDrawer';

const LOCALE_STORAGE_KEY = 'matt-pocock-skills-locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt-BR';
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === 'pt-BR' || stored === 'en' || stored === 'es') {
      return stored;
    }
  } catch {
    // Ignore storage access restrictions
  }
  return 'pt-BR';
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [activeStepId, setActiveStepId] = useState<string>(
    IDEA_TO_SHIP_SKILLS[0].id
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    ROUTER_SCENARIOS[0].id
  );
  const [routerQuery, setRouterQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | SkillCategory>(
    'all'
  );
  const [catalogQuery, setCatalogQuery] = useState<string>('');
  const [inspectedSkillId, setInspectedSkillId] = useState<string | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const routerInputRef = useRef<HTMLInputElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const option = LOCALE_OPTIONS.find((item) => item.id === locale);
    if (option) {
      document.documentElement.lang = option.htmlLang;
      document.title = option.pageTitle;
    }
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage write restrictions
    }
  }, [locale]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const inspectedSkill = inspectedSkillId
    ? (getLocalizedSkillById(inspectedSkillId, locale) ?? null)
    : null;

  const handleInspectSkill = useCallback((skill: Skill) => {
    setInspectedSkillId(skill.id);
  }, []);

  const handleCopy = useCallback((text: string) => {
    const finishCopy = () => {
      setCopiedValue(text);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedValue((current) => (current === text ? null : current));
      }, 2000);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(finishCopy).catch(() => {
        fallbackCopy(text);
        finishCopy();
      });
    } else {
      fallbackCopy(text);
      finishCopy();
    }
  }, []);

  const handleOpenRouter = useCallback(() => {
    const section = document.getElementById('roteador');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      routerInputRef.current?.focus({ preventScroll: true });
    }, 350);
  }, []);

  const handleExploreFlow = useCallback(() => {
    const section = document.getElementById('fluxo');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0A0A0D] text-[#F4F4F6]">
        <Header locale={locale} onOpenRouter={handleOpenRouter} />

        <main>
          <HeroSection
            locale={locale}
            onChangeLocale={setLocale}
            copiedValue={copiedValue}
            onCopy={handleCopy}
            onExploreFlow={handleExploreFlow}
          />

          <IdeaToShipFlow
            locale={locale}
            activeStepId={activeStepId}
            onSelectStep={setActiveStepId}
            onInspectSkill={handleInspectSkill}
            copiedValue={copiedValue}
            onCopy={handleCopy}
          />

          <AskMattRouter
            locale={locale}
            selectedScenarioId={selectedScenarioId}
            onSelectScenario={setSelectedScenarioId}
            query={routerQuery}
            onQueryChange={setRouterQuery}
            onInspectSkill={handleInspectSkill}
            copiedValue={copiedValue}
            onCopy={handleCopy}
            inputRef={routerInputRef}
          />

          <SkillCatalog
            locale={locale}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={catalogQuery}
            onSearchChange={setCatalogQuery}
            copiedValue={copiedValue}
            onCopy={handleCopy}
            onInspectSkill={handleInspectSkill}
          />

          <InstallSection
            locale={locale}
            onChangeLocale={setLocale}
            copiedValue={copiedValue}
            onCopy={handleCopy}
          />
        </main>

        <SkillDetailDrawer
          locale={locale}
          skill={inspectedSkill}
          copiedValue={copiedValue}
          onCopy={handleCopy}
          onClose={() => setInspectedSkillId(null)}
          onSelectSkill={handleInspectSkill}
        />
      </div>
    </MotionConfig>
  );
}

function fallbackCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}
