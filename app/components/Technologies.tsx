'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/app/components/Reveal';

const stackRows = [
  { key: 'frontend', items: 'React · Next.js · TypeScript · Tailwind CSS' },
  { key: 'backend', items: 'Node.js · Python · PostgreSQL · Redis' },
  { key: 'mobile', items: 'React Native · Swift · Kotlin' },
  { key: 'cloud', items: 'AWS · Docker · GitHub Actions' },
] as const;

const practiceKeys = ['review', 'staging', 'cicd', 'handover'] as const;

export function Technologies() {
  const t = useTranslations('tech');

  return (
    <section id="tech" className="page-section">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p className="section-label mb-4">{t('badge')}</p>
          <h2 className="mb-5">{t('title')}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">{t('subtitle')}</p>
        </Reveal>

        <Reveal>
          <div className="card divide-y divide-border mb-12">
            {stackRows.map((row) => (
              <div key={row.key} className="grid md:grid-cols-[180px_1fr] gap-3 md:gap-8 px-6 sm:px-8 py-6">
                <div className="text-sm tracking-wide uppercase text-muted">{t(`categories.${row.key}`)}</div>
                <div className="text-text leading-relaxed">{row.items}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {practiceKeys.map((key) => (
              <div key={key} className="card p-6">
                <div className="text-accent mb-2">{t(`practices.${key}.title`)}</div>
                <div className="text-sm text-muted leading-relaxed">{t(`practices.${key}.text`)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
