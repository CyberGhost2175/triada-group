'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { designServicesData } from '@/app/data/designServices';
import { Reveal } from '@/app/components/Reveal';

export function DesignServices() {
  const t = useTranslations('designSection');
  const catalog = useTranslations('catalog.design');

  return (
    <section id="design" className="page-section">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p className="section-label mb-4">{t('badge')}</p>
          <h2 className="mb-5">{t('title')}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">{t('subtitle')}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {designServicesData.map((service) => (
            <Reveal key={service.slug}>
              <Link href={`/design/${service.slug}`} className="card flex flex-col h-full p-8 hover:border-accent/40">
                <service.icon className="w-6 h-6 text-accent mb-6" strokeWidth={1.5} />
                <h3 className="text-xl mb-3">{catalog(`${service.slug}.title`)}</h3>
                <p className="text-muted leading-relaxed flex-1 mb-8">{catalog(`${service.slug}.shortDescription`)}</p>
                <div className="flex items-center gap-2 text-sm text-accent pt-4 border-t border-border">
                  <span>{t('more')}</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
