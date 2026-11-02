import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { PriceBlock } from '@/app/components/PriceBlock';
import { getDesignServiceBySlug, getAllDesignServiceSlugs } from '@/app/data/designServices';
import { Link } from '@/i18n/navigation';

export async function generateStaticParams() {
  return getAllDesignServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getDesignServiceBySlug(slug);
  if (!service) return { title: 'TRIADA GROUP' };
  const t = await getTranslations({ locale, namespace: `catalog.design.${slug}` });
  return {
    title: `${t('title')} | TRIADA GROUP`,
    description: t('shortDescription'),
  };
}

export default async function DesignServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getDesignServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations('designPage');
  const catalog = await getTranslations(`catalog.design.${slug}`);
  const features = catalog.raw('features') as string[];
  const price = await getTranslations('price');
  const Icon = service.icon;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative pt-28 pb-24">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 mb-10">
          <Link
            href="/#design"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('all')}
          </Link>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative mb-16">
            <div className={`absolute -inset-4 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-10 blur-2xl`} />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl`}
              >
                <Icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                  <span className="text-xs font-medium text-purple-400">{t('badge')}</span>
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

          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent backdrop-blur-sm p-8 sm:p-10">
            <div
              className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2`}
            />
            <div className="relative">
              <PriceBlock
                priceFrom={service.priceFrom}
                priceTo={service.priceTo}
                priceNote={catalog('priceNote')}
                ctaLabel={price('orderDesign')}
                ctaClassName="flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
              />
            </div>
          </section>

          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-4">{t('other')}</p>
            <Link
              href="/#design"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('all')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
