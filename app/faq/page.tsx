import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { FAQAccordion } from '@/app/components/FAQAccordion';

export const metadata = {
  title: 'FAQ | TRIADA GROUP',
  description: 'Часто задаваемые вопросы о разработке сайтов, приложений и digital-услугах TRIADA GROUP.',
};

const faqItems = [
  {
    question: 'Какие услуги вы оказываете?',
    answer: 'Мы разрабатываем веб-сайты и приложения, мобильные приложения (iOS/Android), Telegram и WhatsApp ботов, CRM-системы, интернет-магазины, а также делаем UI/UX дизайн и IT-продукты под ключ. Полный список с описанием и ориентировочными ценами — в разделе «Услуги».',
  },
  {
    question: 'Как оценивается стоимость проекта?',
    answer: 'Стоимость зависит от объёма работ: количества страниц или экранов, сложности дизайна, интеграций (оплата, CRM, 1С и т.д.) и сроков. После обсуждения задачи мы присылаем коммерческое предложение с фиксированной или поэтапной оценкой. Предварительные диапазоны цен указаны на страницах каждой услуги.',
  },
  {
    question: 'Сколько времени занимает разработка?',
    answer: 'Сроки зависят от типа проекта: лендинг — от 2–3 недель, корпоративный сайт — 1–3 месяца, интернет-магазин или приложение — от 2–4 месяцев. Точные сроки определяются после анализа требований и согласуются в договоре.',
  },
  {
    question: 'Работаете ли вы с клиентами из других городов и стран?',
    answer: 'Да. Мы работаем удалённо с заказчиками из Казахстана, России, СНГ и других стран. Общение — по видеозвонкам, в Telegram и по email. Оплата возможна по счёту, в том числе для юрлиц.',
  },
  {
    question: 'Предоставляете ли вы поддержку после запуска?',
    answer: 'Да. После сдачи проекта мы можем заключить договор на техническую поддержку: доработки, обновления, мониторинг и консультации. Условия и стоимость обсуждаются индивидуально.',
  },
  {
    question: 'Как начать сотрудничество?',
    answer: 'Оставьте заявку через форму на сайте, напишите нам в Telegram (@triada_workspace), WhatsApp (+7 705 116 86 80) или на email triada.workspace@gmail.com. Мы свяжемся с вами, уточним задачу и предложим следующий шаг — созвон или коммерческое предложение.',
  },
];

export default function FAQPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="text-sm font-medium text-cyan-400">FAQ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Часто задаваемые{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              вопросы
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-12">
            Ответы на популярные вопросы о наших услугах, сроках и процессе работы.
          </p>

          <FAQAccordion items={faqItems} />

          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-4">Не нашли ответ? Напишите нам — ответим лично.</p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all font-medium"
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
