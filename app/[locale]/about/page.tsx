import { ArrowLeft, Target, Check, Globe, Heart } from 'lucide-react';
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
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const values = [
    { icon: Check, title: t('quality'), desc: t('qualityText') },
    { icon: Globe, title: t('openness'), desc: t('opennessText') },
    { icon: Heart, title: t('result'), desc: t('resultText') },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-12">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t('home')}
          </Link>

          <section className="mb-16">
            <p className="section-label mb-4">{t('badge')}</p>
            <h1 className="mb-6">
              {t('title')} {t('titleAccent')}
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-2xl">{t('lead')}</p>
          </section>

          <section className="mb-16">
            <div className="card p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start">
              <Target className="w-6 h-6 text-accent shrink-0" strokeWidth={1.5} />
              <div>
                <h2 className="!text-2xl mb-4">{t('mission')}</h2>
                <p className="text-muted leading-relaxed text-lg">{t('missionText')}</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="!text-2xl mb-8">{t('principles')}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {values.map((item) => (
                <div key={item.title} className="card p-6">
                  <item.icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <p className="text-muted mb-6">{t('ready')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/#contact" className="btn-primary">
                {t('contactUs')}
              </Link>
              <Link href="/#services" className="btn-ghost">
                {t('ourServices')}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
