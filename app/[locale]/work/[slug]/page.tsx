import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { WorkGallery } from '@/app/components/WorkGallery';
import { Link } from '@/i18n/navigation';
import { getWorkProject, getWorkSlugs } from '@/app/data/work';

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return { title: 'Triada Group' };
  const t = await getTranslations({ locale, namespace: 'workSection' });
  return {
    title: `${t(`projects.${slug}.name`)} | Triada Group`,
    description: t(`projects.${slug}.problem`),
  };
}

export default async function WorkCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getWorkProject(slug);
  if (!project) notFound();

  const t = await getTranslations('workSection');
  const slides = project.slides.map((slide) => ({
    src: slide.src,
    alt: t(`projects.${slug}.slides.${slide.key}`),
  }));

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-10">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t('back')}
          </Link>

          <p className="section-label mb-4">{t('badge')}</p>
          <h1 className="mb-3">{t(`projects.${slug}.name`)}</h1>
          <p className="text-lg text-muted mb-10">{t(`projects.${slug}.client`)}</p>

          <div className="card overflow-hidden mb-12">
            <WorkGallery slides={slides} />
          </div>

          <div className="grid gap-8">
            <div>
              <p className="section-label mb-2">{t('problemLabel')}</p>
              <p className="text-lg text-muted leading-relaxed">{t(`projects.${slug}.problem`)}</p>
            </div>
            <div>
              <p className="section-label mb-2">{t('resultLabel')}</p>
              <p className="text-lg leading-relaxed">{t(`projects.${slug}.result`)}</p>
            </div>
            <div>
              <p className="section-label mb-2">{t('stackLabel')}</p>
              <p className="text-muted">{t(`projects.${slug}.stack`)}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
