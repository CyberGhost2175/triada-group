'use client';

import { motion } from 'motion/react';
import { 
  Globe, 
  ShoppingCart, 
  MessageSquare, 
  Smartphone, 
  Monitor, 
  Database, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Веб-приложения и сайты',
    description: 'Современные веб-решения любой сложности с безупречным UX',
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['React', 'Next.js', 'Node.js'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce решения',
    description: 'Интернет-магазины с высокой конверсией и интеграцией платёжных систем',
    gradient: 'from-purple-500 to-pink-500',
    tags: ['Shopify', 'WooCommerce', 'Custom'],
  },
  {
    icon: MessageSquare,
    title: 'Telegram / WhatsApp боты',
    description: 'Умные боты для автоматизации бизнес-процессов и коммуникации',
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['AI', 'Automation', 'Integration'],
  },
  {
    icon: Smartphone,
    title: 'Мобильные приложения',
    description: 'Нативные iOS и Android приложения с современным дизайном',
    gradient: 'from-orange-500 to-red-500',
    tags: ['iOS', 'Android', 'React Native'],
  },
  {
    icon: Monitor,
    title: 'Десктопные приложения',
    description: 'Кросс-платформенные решения для Windows, macOS и Linux',
    gradient: 'from-indigo-500 to-purple-500',
    tags: ['Electron', 'Tauri', 'Native'],
  },
  {
    icon: Database,
    title: 'CRM-системы',
    description: 'Индивидуальные CRM с аналитикой и автоматизацией продаж',
    gradient: 'from-violet-500 to-fuchsia-500',
    tags: ['Custom CRM', 'Analytics', 'Integration'],
  },
  {
    icon: Sparkles,
    title: 'IT-продукты под ключ',
    description: 'Полный цикл: от идеи и прототипа до запуска и поддержки',
    gradient: 'from-amber-500 to-orange-500',
    tags: ['Full-cycle', 'MVP', 'Support'],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-sm font-medium text-blue-400">Наши услуги</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Полный спектр{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              digital-услуг
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            От идеи до реализации — создаём технологичные решения,
            <br className="hidden sm:block" />
            которые работают на ваш бизнес
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Hover Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-20 blur-lg`}></div>
                  <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors mb-6 leading-relaxed text-[15px]">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 group-hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-blue-400 transition-colors">
                  <span>Подробнее</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6">
            Не нашли нужную услугу? Мы решаем любые IT-задачи
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
          >
            Обсудить проект
          </a>
        </motion.div>
      </div>
    </section>
  );
}
