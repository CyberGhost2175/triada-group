'use client';

import { motion } from 'motion/react';
import { Palette, Smartphone, Monitor, Home, ArrowUpRight } from 'lucide-react';

const designServices = [
  {
    icon: Palette,
    title: 'UI/UX дизайн',
    description: 'Создаём интуитивные интерфейсы, которые влюбляют пользователей с первого взаимодействия',
    features: ['User Research', 'Prototyping', 'Usability Testing', 'Design Systems'],
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    icon: Smartphone,
    title: 'Мобильный дизайн',
    description: 'Адаптивные дизайны для iOS и Android с вниманием к каждому пикселю и жесту',
    features: ['iOS Guidelines', 'Material Design', 'Adaptive UI', 'Micro-animations'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Monitor,
    title: 'Web & Mobile интерфейсы',
    description: 'Комплексный подход к созданию цифровых продуктов на всех платформах',
    features: ['Responsive Design', 'Accessibility', 'Branding', 'Component Library'],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Home,
    title: 'Дизайн интерьеров',
    description: 'Создаём гармоничные пространства для офисов, магазинов и жилых помещений',
    features: ['3D Visualization', 'Space Planning', 'Material Selection', 'Supervision'],
    gradient: 'from-orange-500 to-red-500',
  },
];

export function DesignServices() {
  return (
    <section id="design" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="text-sm font-medium text-purple-400">Дизайн-направления</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Создаём{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              визуальную магию
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            Превращаем идеи в восхитительный пользовательский опыт
            <br className="hidden sm:block" />
            с вниманием к каждой детали
          </p>
        </motion.div>

        {/* Design Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {designServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>

              {/* Card */}
              <div className="relative h-full rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 overflow-hidden">
                {/* Content */}
                <div className="p-10">
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-20 blur-lg`}></div>
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl`}>
                      <service.icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors"
                      >
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-purple-400 transition-colors pt-4 border-t border-white/5">
                    <span>Узнать больше</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Decorative gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
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
          className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 text-center relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="relative">
            <h3 className="text-3xl font-bold mb-4">
              Нужен дизайн, который продаёт?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Создадим уникальный дизайн, который подчеркнёт индивидуальность вашего бренда
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105"
            >
              Заказать дизайн
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
