'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/app/components/Reveal';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="wrap py-24 md:py-32 text-center">
        <Reveal>
          <p className="section-label mb-8">{t('badge')}</p>
        </Reveal>
        <Reveal>
          <h1 className="mb-8 max-w-5xl mx-auto">{t('title')}</h1>
        </Reveal>
        <Reveal>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('subtitle')}
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contact" className="btn-primary">
              {t('ctaProject')}
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
            <Link href="/#work" className="btn-ghost">
              {t('ctaWork')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
