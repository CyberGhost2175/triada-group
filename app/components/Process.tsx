'use client';

import { MessageSquare, Lightbulb, Code, Rocket, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/app/components/Reveal';

export function Process() {
  const t = useTranslations('process');
  const steps = [
    { number: '01', key: '1' as const, icon: MessageSquare },
    { number: '02', key: '2' as const, icon: Lightbulb },
    { number: '03', key: '3' as const, icon: Code },
    { number: '04', key: '4' as const, icon: Rocket },
    { number: '05', key: '5' as const, icon: TrendingUp },
  ];

  return (
    <section id="process" className="page-section">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p className="section-label mb-4">{t('badge')}</p>
          <h2 className="mb-5">{t('title')}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">{t('subtitle')}</p>
        </Reveal>

        <div className="space-y-3">
          {steps.map((step) => (
            <Reveal key={step.number}>
              <div className="card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="text-accent font-serif text-xl w-12 shrink-0">{step.number}</div>
                <step.icon className="w-5 h-5 text-accent shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl mb-2">{t(`steps.${step.key}.title`)}</h3>
                  <p className="text-muted leading-relaxed">{t(`steps.${step.key}.description`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            <div className="card p-8 text-center">
              <div className="text-2xl text-accent mb-2">{t('mvp')}</div>
              <div className="text-sm text-muted">{t('mvpLabel')}</div>
            </div>
            <div className="card p-8 text-center">
              <div className="text-2xl text-accent mb-2">{t('method')}</div>
              <div className="text-sm text-muted">{t('methodLabel')}</div>
            </div>
            <div className="card p-8 text-center">
              <div className="text-2xl text-accent mb-2">{t('warranty')}</div>
              <div className="text-sm text-muted">{t('warrantyLabel')}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
