import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Lock } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata = {
  title: 'Портфолио | TRIADA GROUP',
  description: 'Примеры работ: веб-разработка, UI/UX дизайн, мобильные приложения. Проекты под NDA.',
};

const portfolioItems = [
  {
    category: 'web' as const,
    title: 'Корпоративный сайт',
    description: 'Многостраничный сайт с каталогом, блогом и формой заявок. Адаптивная вёрстка, админ-панель, интеграция с аналитикой.',
    tags: ['React', 'Next.js', 'CMS'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    imageAlt: 'Веб-разработка, рабочий стол',
  },
  {
    category: 'web' as const,
    title: 'Лендинг и сайт-визитка',
    description: 'Промо-страница для одной услуги с формой обратной связи и быстрой загрузкой. SEO и конверсия в заявку.',
    tags: ['Next.js', 'Tailwind', 'Формы'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    imageAlt: 'Лендинг, экран с аналитикой',
  },
  {
    category: 'design' as const,
    title: 'Редизайн веб-сервиса',
    description: 'Новая визуальная концепция, прототипы и UI-кит. Улучшение навигации и конверсии ключевых сценариев.',
    tags: ['Figma', 'Прототипы', 'Дизайн-система'],
    image: 'https://picsum.photos/id/1/800/450',
    imageAlt: 'UI/UX дизайн, макеты',
  },
  {
    category: 'design' as const,
    title: 'Интерфейс мобильного приложения',
    description: 'UX-исследование, пользовательские сценарии и полный UI-дизайн приложения с учётом гайдлайнов платформ.',
    tags: ['UI/UX', 'iOS & Android', 'Wireframes'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
    imageAlt: 'Дизайн интерфейса',
  },
  {
    category: 'mobile' as const,
    title: 'Мобильное приложение',
    description: 'Кроссплатформенное приложение с личным кабинетом, основными бизнес-сценариями и интеграциями. Запуск в сторы.',
    tags: ['React Native', 'iOS', 'Android'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    imageAlt: 'Мобильное приложение, смартфон',
  },
];

function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-800/50">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="h-full w-full object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/50 backdrop-blur px-2.5 py-1.5 text-xs text-slate-300">
        <Lock className="h-3.5 w-3.5" />
        NDA
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const webItems = portfolioItems.filter((p) => p.category === 'web');
  const designItems = portfolioItems.filter((p) => p.category === 'design');
  const mobileItems = portfolioItems.filter((p) => p.category === 'mobile');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-400">Портфолио</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Избранные{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              проекты
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-14 max-w-2xl">
            Примеры работ по веб-разработке, UI/UX и мобильным приложениям. Названия и детали проектов не раскрываются в соответствии с NDA.
          </p>

          {/* Web */}
          <section className="mb-16">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-6">
              Веб-разработка
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {webItems.map((item) => (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
                >
                  <PortfolioImage src={item.image} alt={item.imageAlt} />
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* UI/UX Design */}
          <section className="mb-16">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-6">
              UI/UX дизайн
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {designItems.map((item) => (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
                >
                  <PortfolioImage src={item.image} alt={item.imageAlt} />
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Mobile */}
          <section className="mb-16">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-6">
              Мобильные приложения
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {mobileItems.map((item) => (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300 sm:max-w-xl"
                >
                  <PortfolioImage src={item.image} alt={item.imageAlt} />
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="text-center pt-8">
            <p className="text-slate-500 mb-6">
              Хотите обсудить свой проект?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all font-medium"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
