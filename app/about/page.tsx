import Link from 'next/link';
import { ArrowLeft, Target, Sparkles, Globe, Heart } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export const metadata = {
  title: 'О компании | TRIADA GROUP',
  description: 'Международная IT-студия премиум-класса. Создаём цифровые продукты, которые меняют бизнес.',
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          {/* Hero */}
          <section className="mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="text-sm font-medium text-blue-400">О нас</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Мы создаём цифровые продукты,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                которые меняют бизнес
              </span>
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
              TRIADA GROUP — международная IT-студия премиум-класса. Разрабатываем сайты, приложения, ботов и CRM под ключ: от идеи до запуска и поддержки.
            </p>
          </section>

          {/* Mission */}
          <section className="mb-20">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/5 via-slate-900/50 to-transparent p-8 sm:p-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Наша миссия</h2>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    Помогать бизнесу расти через технологии. Мы не просто пишем код — мы проектируем решения, которые увеличивают выручку, сокращают издержки и улучшают опыт клиентов. Каждый проект для нас — партнёрство на результат.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8">Наши принципы</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Sparkles, title: 'Качество', desc: 'Чистый код, современный стек, тестирование и поддержка после запуска.', gradient: 'from-amber-500 to-orange-500' },
                { icon: Globe, title: 'Открытость', desc: 'Работаем с клиентами из разных стран. Прозрачный процесс и честные сроки.', gradient: 'from-blue-500 to-cyan-500' },
                { icon: Heart, title: 'Результат', desc: 'Фокус на ваших целях: конверсия, трафик, автоматизация, экономия времени.', gradient: 'from-emerald-500 to-teal-500' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <p className="text-slate-500 mb-6">Готовы обсудить ваш проект?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all font-medium shadow-lg shadow-blue-500/20"
              >
                Связаться с нами
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition-all font-medium"
              >
                Наши услуги
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
