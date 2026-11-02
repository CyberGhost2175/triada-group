import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { PriceBlock } from '@/app/components/PriceBlock';
import { getServiceBySlug, getAllServiceSlugs } from '@/app/data/services';
import { Link } from '@/i18n/navigation';

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'TRIADA GROUP' };
  const t = await getTranslations({ locale, namespace: `catalog.services.${slug}` });
  return {
    title: `${t('title')} | TRIADA GROUP`,
    description: t('shortDescription'),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations('servicePage');
  const catalog = await getTranslations(`catalog.services.${slug}`);
  const features = catalog.raw('features') as string[];
  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />

      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('all')}
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative mb-16">
            <div className={`absolute -inset-4 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-10 blur-2xl`} />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl`}
              >
                <Icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                  <span className="text-xs font-medium text-slate-400">{t('badge')}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  {catalog('title')}
                </h1>
                <p className="text-xl text-slate-400 font-light max-w-2xl">{catalog('shortDescription')}</p>
              </div>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-lg font-semibold text-slate-300 mb-4">{t('description')}</h2>
            <p className="text-slate-400 leading-relaxed text-lg">{catalog('fullDescription')}</p>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-semibold text-slate-300 mb-6">{t('features')}</h2>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-2 mb-16">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10">
            <div
              className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2`}
            />
            <div className="relative">
              <PriceBlock
                priceFrom={service.priceFrom}
                priceTo={service.priceTo}
                priceNote={catalog('priceNote')}
              />
            </div>
          </section>

          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-4">{t('other')}</p>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('seeAll')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
