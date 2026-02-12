import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Banknote } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { getServiceBySlug, getAllServiceSlugs } from '@/app/data/services';

function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Услуга | TRIADA GROUP' };
  return {
    title: `${service.title} | TRIADA GROUP`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />

      <main className="pt-28 pb-24">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-10">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Все услуги
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Hero block */}
          <div className="relative mb-16">
            <div
              className={`absolute -inset-4 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-10 blur-2xl`}
            />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl`}
              >
                <Icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                  <span className="text-xs font-medium text-slate-400">
                    Услуга
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-slate-400 font-light max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="mb-16">
            <h2 className="text-lg font-semibold text-slate-300 mb-4">
              Описание
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {service.fullDescription}
            </p>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-lg font-semibold text-slate-300 mb-6">
              Что входит в услугу
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-400"
                >
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

          {/* Tags */}
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

          {/* Pricing block */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10">
            <div
              className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2`}
            />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">
                    Примерный прайс
                  </h2>
                  <p className="text-2xl sm:text-3xl font-bold">
                    от {formatPrice(service.priceFrom)} — до{' '}
                    {formatPrice(service.priceTo)}{' '}
                    <span className="text-slate-400 font-normal text-xl">
                      ₸
                    </span>
                  </p>
                  {service.priceNote && (
                    <p className="text-slate-500 text-sm mt-2 max-w-md">
                      {service.priceNote}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href="/#contact"
                className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
              >
                Обсудить проект
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-4">
              Нужна другая услуга или комбинация решений?
            </p>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Смотреть все услуги
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
