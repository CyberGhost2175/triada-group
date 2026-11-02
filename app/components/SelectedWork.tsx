'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/app/components/Reveal';
import { WorkGallery } from '@/app/components/WorkGallery';
import { workProjects } from '@/app/data/work';

export function SelectedWork() {
  const t = useTranslations('workSection');

  return (
    <section id="work" className="page-section">
      <div className="wrap">
        <Reveal className="text-center mb-12">
          <p className="section-label mb-4">{t('badge')}</p>
          <h2>{t('title')}</h2>
        </Reveal>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {workProjects.map((project) => (
            <Reveal key={project.slug}>
              <article className="card overflow-hidden">
                <WorkGallery
                  slides={project.slides.map((slide) => ({
                    src: slide.src,
                    alt: t(`projects.${project.slug}.slides.${slide.key}`),
                  }))}
                />
                <div className="p-7 sm:p-8">
                  <h3 className="text-xl mb-1">
                    {t(`projects.${project.slug}.name`)}{' '}
                    <span className="text-muted">— {t(`projects.${project.slug}.client`)}</span>
                  </h3>
                  <p className="text-muted mt-4 leading-relaxed">{t(`projects.${project.slug}.problem`)}</p>
                  <p className="text-text mt-2 leading-relaxed">{t(`projects.${project.slug}.result`)}</p>
                  <p className="text-sm text-muted mt-5">{t(`projects.${project.slug}.stack`)}</p>
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 text-accent mt-6 hover:text-text"
                  >
                    {t('viewCase')}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
