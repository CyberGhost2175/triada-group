'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { servicesData } from '@/app/data/services';
import { Reveal } from '@/app/components/Reveal';

export function Services() {
  const t = useTranslations('servicesSection');
  const catalog = useTranslations('catalog.services');

  return (
    <section id="services" className="page-section">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p className="section-label mb-4">{t('badge')}</p>
          <h2 className="mb-5">{t('title')}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">{t('subtitle')}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesData.map((service) => (
            <Reveal key={service.slug}>
              <Link href={`/services/${service.slug}`} className="card flex h-full flex-col p-7 hover:border-accent/40">
                <service.icon className="w-6 h-6 text-accent mb-6" strokeWidth={1.5} />
                <h3 className="text-lg mb-3">{catalog(`${service.slug}.title`)}</h3>
                <p className="text-muted leading-relaxed text-[15px] flex-1 mb-6">
                  {catalog(`${service.slug}.shortDescription`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs text-muted border border-border rounded-[12px]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-accent">
                  <span>{t('more')}</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-16">
          <p className="text-muted mb-6">{t('ctaText')}</p>
          <Link href="/#contact" className="btn-primary">
            {t('ctaButton')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
