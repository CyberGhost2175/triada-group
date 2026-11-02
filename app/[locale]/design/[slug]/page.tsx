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
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/#design" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-10">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t('all')}
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-16">
            <Icon className="w-7 h-7 text-accent shrink-0 mt-1" strokeWidth={1.5} />
            <div>
              <p className="section-label mb-4">{t('badge')}</p>
              <h1 className="mb-4">{catalog('title')}</h1>
              <p className="text-xl text-muted max-w-2xl">{catalog('shortDescription')}</p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="!text-xl mb-4">{t('description')}</h2>
            <p className="text-muted leading-relaxed text-lg">{catalog('fullDescription')}</p>
          </section>

          <section className="mb-16">
            <h2 className="!text-xl mb-6">{t('features')}</h2>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-muted">
                  <Check className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                  <span className="text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-8 sm:p-10">
            <PriceBlock
              priceFrom={service.priceFrom}
              priceTo={service.priceTo}
              priceNote={catalog('priceNote')}
              ctaLabel={price('orderDesign')}
            />
          </section>

          <div className="mt-16 text-center">
            <p className="text-muted mb-4">{t('other')}</p>
            <Link href="/#design" className="inline-flex items-center gap-2 text-accent hover:text-text">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              {t('all')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
