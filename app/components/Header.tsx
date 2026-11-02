'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { HEADER_OFFSET, NAV_SECTION_EVENT } from '@/app/components/SmoothScroll';

const SECTION_IDS = ['services', 'work', 'design', 'tech', 'process', 'contact'] as const;
const SPY_LINE = HEADER_OFFSET + 12;

function sectionFromHref(href: string) {
  return href.split('#')[1] ?? '';
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: t('services'), href: '/#services' as const },
    { name: t('work'), href: '/#work' as const },
    { name: t('design'), href: '/#design' as const },
    { name: t('tech'), href: '/#tech' as const },
    { name: t('process'), href: '/#process' as const },
    { name: t('contact'), href: '/#contact' as const },
  ];

  const lockedId = useRef<string | null>(null);
  const unlockTimer = useRef<number>(0);

  useEffect(() => {
    const sectionFromPath = () => {
      if (pathname.startsWith('/services')) return 'services';
      if (pathname.startsWith('/design')) return 'design';
      if (pathname.startsWith('/portfolio') || pathname.startsWith('/work')) return 'work';
      return null;
    };

    const resolveActive = () => {
      const fromPath = sectionFromPath();
      if (fromPath) {
        setActiveId(fromPath);
        return;
      }
      if (pathname !== '/') {
        setActiveId(null);
        return;
      }
      if (lockedId.current) {
        setActiveId(lockedId.current);
        return;
      }

      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= SPY_LINE && rect.bottom > SPY_LINE) {
          current = id;
          break;
        }
      }
      setActiveId(current);
    };

    const lockTo = (id: string) => {
      lockedId.current = id;
      setActiveId(id);
      setIsOpen(false);
      window.clearTimeout(unlockTimer.current);
      const unlock = () => {
        lockedId.current = null;
        resolveActive();
      };
      const onScrollEnd = () => {
        window.removeEventListener('scrollend', onScrollEnd);
        unlock();
      };
      window.addEventListener('scrollend', onScrollEnd, { once: true });
      unlockTimer.current = window.setTimeout(() => {
        window.removeEventListener('scrollend', onScrollEnd);
        unlock();
      }, 900);
    };

    const onNavSection = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (id) lockTo(id);
    };

    resolveActive();
    window.addEventListener('scroll', resolveActive, { passive: true });
    window.addEventListener('hashchange', resolveActive);
    window.addEventListener(NAV_SECTION_EVENT, onNavSection);
    return () => {
      window.clearTimeout(unlockTimer.current);
      window.removeEventListener('scroll', resolveActive);
      window.removeEventListener('hashchange', resolveActive);
      window.removeEventListener(NAV_SECTION_EVENT, onNavSection);
    };
  }, [pathname]);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  const langSwitcher = (
    <div className="inline-flex rounded-[12px] border border-border p-0.5">
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          className={`px-2.5 py-1 text-xs font-medium uppercase rounded-md ${
            locale === code ? 'text-text bg-surface' : 'text-muted hover:text-text'
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="wrap">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/triada-logo.svg"
              alt="TRIADA GROUP"
              width={72}
              height={72}
              className="object-contain w-16 h-16"
            />
            <span className="text-lg tracking-tight">
              TRIADA <span className="text-muted">GROUP</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === sectionFromHref(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-3 py-2 text-sm ${
                    isActive ? 'text-accent' : 'text-muted hover:text-text'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="ml-3">{langSwitcher}</div>
            <Link href="/#contact" className="btn-primary ml-3 py-2 px-4 text-sm">
              {t('contactCta')}
            </Link>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            {langSwitcher}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text"
              aria-label="Menu"
            >
              {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-6 space-y-1">
            {navItems.map((item) => {
              const isActive = activeId === sectionFromHref(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block px-3 py-2.5 text-sm ${
                    isActive ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link href="/#contact" onClick={() => setIsOpen(false)} className="btn-primary w-full mt-3">
              {t('contactCta')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
