'use client';

import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { HEADER_OFFSET, NAV_SECTION_EVENT } from '@/app/components/SmoothScroll';

const SECTION_IDS = ['services', 'design', 'tech', 'process', 'contact'] as const;
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
    <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          className={`px-2.5 py-1 text-xs font-semibold uppercase rounded-md transition-colors ${
            locale === code
              ? 'bg-white/15 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: -16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 group"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative flex-shrink-0 w-25 h-20"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="/triada-logo.svg"
                  alt="TRIADA GROUP"
                  width={100}
                  height={100}
                  className="object-contain w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                />
              </motion.div>
              <motion.span
                className="text-xl font-semibold tracking-tight"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                TRIADA <span className="text-slate-400">GROUP</span>
              </motion.span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = activeId === sectionFromHref(item.href);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 ring-1 ring-white/15 shadow-[0_0_18px_rgba(139,92,246,0.28)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
            <div className="ml-3">{langSwitcher}</div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/#contact"
                className="ml-3 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all text-sm font-medium shadow-lg shadow-purple-500/20 inline-block"
              >
                {t('contactCta')}
              </Link>
            </motion.div>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            {langSwitcher}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-6 space-y-2"
          >
            {navItems.map((item) => {
              const isActive = activeId === sectionFromHref(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 ring-1 ring-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium mt-4"
            >
              {t('contactCta')}
            </Link>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
