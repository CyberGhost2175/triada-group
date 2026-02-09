'use client';

import { motion } from 'motion/react';
import { Code2, Layers, Zap } from 'lucide-react';

const techCategories = [
  {
    name: 'Frontend',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Vue.js',
      'Tailwind CSS',
      'Motion',
      'Redux',
      'GraphQL',
    ],
  },
  {
    name: 'Backend',
    icon: Layers,
    gradient: 'from-purple-500 to-pink-500',
    technologies: [
      'Node.js',
      'Python',
      'Go',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'RabbitMQ',
      'Microservices',
    ],
  },
  {
    name: 'Mobile',
    icon: Zap,
    gradient: 'from-emerald-500 to-teal-500',
    technologies: [
      'React Native',
      'Swift',
      'Kotlin',
      'Flutter',
      'Expo',
      'Firebase',
      'Native APIs',
      'App Store',
    ],
  },
  {
    name: 'DevOps',
    icon: Code2,
    gradient: 'from-orange-500 to-red-500',
    technologies: [
      'Docker',
      'Kubernetes',
      'AWS',
      'CI/CD',
      'Nginx',
      'GitHub Actions',
      'Terraform',
      'Monitoring',
    ],
  },
  {
    name: 'AI & Data',
    icon: Layers,
    gradient: 'from-violet-500 to-fuchsia-500',
    technologies: [
      'OpenAI',
      'TensorFlow',
      'LangChain',
      'Analytics',
      'ML Models',
      'Big Data',
      'NLP',
      'Computer Vision',
    ],
  },
  {
    name: 'Design',
    icon: Zap,
    gradient: 'from-pink-500 to-rose-500',
    technologies: [
      'Figma',
      'Adobe XD',
      'Sketch',
      'Prototyping',
      'Design Systems',
      'UI Kits',
      'Animation',
      'Branding',
    ],
  },
];

const stats = [
  { value: '50+', label: 'Технологий в стеке' },
  { value: '99.9%', label: 'Uptime гарантия' },
  { value: '24/7', label: 'Техподдержка' },
  { value: '100%', label: 'Качество кода' },
];

export function Technologies() {
  return (
    <section id="tech" className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-400">Технологии</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Работаем с{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              передовым стеком
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            Используем проверенные технологии и следим за инновациями
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>

              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:bg-white/[0.05] hover:border-white/20 hover:text-white transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/[0.05]"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center py-4"
            >
              <div className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
