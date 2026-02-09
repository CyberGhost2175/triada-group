'use client';

import { motion } from 'motion/react';
import { MessageSquare, Lightbulb, Code, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Анализ и консультация',
    description: 'Изучаем ваш бизнес, цели и задачи. Проводим анализ целевой аудитории и конкурентов',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Проектирование',
    description: 'Создаём прототипы, дизайн и архитектуру. Согласовываем каждый этап с вами',
    icon: Lightbulb,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Разработка',
    description: 'Пишем чистый код по лучшим практикам. Проводим тестирование на каждом этапе',
    icon: Code,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '04',
    title: 'Запуск',
    description: 'Деплоим проект, настраиваем инфраструктуру и проводим обучение вашей команды',
    icon: Rocket,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    number: '05',
    title: 'Поддержка',
    description: 'Обеспечиваем техподдержку 24/7, собираем метрики и улучшаем продукт',
    icon: TrendingUp,
    gradient: 'from-violet-500 to-fuchsia-500',
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-sm font-medium text-orange-400">Процесс работы</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Прозрачный{' '}
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              путь к успеху
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            Проверенная методология разработки с фокусом на результат
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>

              {/* Card */}
              <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 overflow-hidden">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8 lg:p-10">
                  {/* Number Badge */}
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-2xl opacity-20 blur-xl`}></div>
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}>
                      <span className="text-2xl font-bold">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                        <step.icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-white transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-8 left-10 w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid md:grid-cols-3 gap-8 p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/[0.05]"
        >
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              2-3 недели
            </div>
            <div className="text-sm text-slate-400 font-medium">Средний срок MVP</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Agile/Scrum
            </div>
            <div className="text-sm text-slate-400 font-medium">Методология</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
              6 месяцев
            </div>
            <div className="text-sm text-slate-400 font-medium">Гарантия</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
