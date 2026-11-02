import Image from 'next/image';
import { ArrowLeft, Lock } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

const portfolioMeta = [
  { id: 'corp', category: 'web' as const, tags: ['React', 'Next.js', 'CMS'], image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80' },
  { id: 'landing', category: 'web' as const, tags: ['Next.js', 'Tailwind'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { id: 'redesign', category: 'design' as const, tags: ['Figma', 'UI kit'], image: 'https://picsum.photos/id/1/800/450' },
  { id: 'mobileUi', category: 'design' as const, tags: ['UI/UX', 'iOS & Android'], image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80' },
  { id: 'app', category: 'mobile' as const, tags: ['React Native', 'iOS', 'Android'], image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80' },
];

function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-border bg-surface">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="h-full w-full object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-[12px] border border-border bg-bg/80 px-2.5 py-1.5 text-xs text-muted">
        <Lock className="h-3.5 w-3.5" />
        NDA
      </div>
    </div>
  );
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('portfolio');

  const items = portfolioMeta.map((item) => ({
    ...item,
    title: t(`items.${item.id}.title`),
    description: t(`items.${item.id}.description`),
    imageAlt: t(`items.${item.id}.alt`),
  }));

  const webItems = items.filter((p) => p.category === 'web');
  const designItems = items.filter((p) => p.category === 'design');
  const mobileItems = items.filter((p) => p.category === 'mobile');

  const renderCards = (list: typeof items, extraClass = '') => (
    <div className="grid sm:grid-cols-2 gap-8">
      {list.map((item) => (
        <article
          key={item.id}
          className={`card overflow-hidden ${extraClass}`}
        >
          <PortfolioImage src={item.image} alt={item.imageAlt} />
          <div className="p-5 sm:p-6">
            <h3 className="text-xl mb-2">{item.title}</h3>
            <p className="text-muted text-sm leading-relaxed mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[12px] px-2.5 py-1 text-xs text-muted border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />

      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-12">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t('home')}
          </Link>

          <p className="section-label mb-4">{t('badge')}</p>
          <h1 className="mb-4">
            {t('title')} {t('titleAccent')}
          </h1>
          <p className="text-lg text-muted mb-14 max-w-2xl">{t('lead')}</p>

          <section className="mb-16">
            <h2 className="section-label mb-6">{t('web')}</h2>
            {renderCards(webItems)}
          </section>

          <section className="mb-16">
            <h2 className="section-label mb-6">{t('design')}</h2>
            {renderCards(designItems)}
          </section>

          <section className="mb-16">
            <h2 className="section-label mb-6">{t('mobile')}</h2>
            {renderCards(mobileItems, 'sm:max-w-xl')}
          </section>

          <div className="text-center pt-8">
            <p className="text-muted mb-6">{t('cta')}</p>
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
