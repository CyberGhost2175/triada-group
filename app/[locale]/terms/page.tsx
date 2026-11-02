import { ArrowLeft } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { LegalBody } from '@/app/components/LegalBody';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: `${t('termsTitle')} | Triada Group`, description: t('termsTitle') };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  const home = await getTranslations('about');
  const paragraphs = t.raw('terms') as string[];

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-10">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {home('home')}
          </Link>
          <h1 className="mb-10">{t('termsTitle')}</h1>
          <LegalBody paragraphs={paragraphs} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
