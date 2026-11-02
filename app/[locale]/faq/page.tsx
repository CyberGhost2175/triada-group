import { ArrowLeft } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { FAQAccordion } from '@/app/components/FAQAccordion';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const items = (t.raw('items') as { q: string; a: string }[]).map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-12">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t('home')}
          </Link>
          <p className="section-label mb-4">{t('badge')}</p>
          <h1 className="mb-4">
            {t('title')} {t('titleAccent')}
          </h1>
          <p className="text-lg text-muted mb-12">{t('lead')}</p>
          <FAQAccordion items={items} />
          <div className="mt-16 text-center">
            <p className="text-muted mb-4">{t('noAnswer')}</p>
            <Link href="/#contact" className="btn-primary">
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
