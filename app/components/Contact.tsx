'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, MessageCircle, CheckCircle2, XCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 5000);
    return () => clearTimeout(t);
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setNotification({
          type: 'error',
          message: data.error || 'Не удалось отправить заявку. Попробуйте позже.',
        });
        return;
      }

      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setNotification({
        type: 'success',
        message: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
      });
    } catch {
      setNotification({
        type: 'error',
        message: 'Ошибка отправки. Проверьте интернет и попробуйте снова.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'triada.workspace@gmail.com',
      href: 'mailto:triada.workspace@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (775) 000 21-75',
      href: 'tel:+77750002175',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/50 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

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
            <span className="text-sm font-medium text-blue-400">Связаться с нами</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Начнём{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              сотрудничество
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
            Заполните форму, и наш менеджер свяжется с вами в течение часа
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <AnimatePresence mode="wait">
                {notification && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-2xl border p-5 flex items-start gap-4 ${
                      notification.type === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
                        : 'bg-red-500/10 border-red-500/30 text-red-100'
                    }`}
                  >
                    {notification.type === 'success' ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    ) : (
                      <XCircle className="w-7 h-7 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    )}
                    <p className="text-base font-medium leading-snug">{notification.message}</p>
                    <button
                      type="button"
                      onClick={() => setNotification(null)}
                      className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors opacity-70 hover:opacity-100"
                      aria-label="Закрыть"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2">
                    Услуга
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-slate-900">Выберите услугу</option>
                    <option value="web" className="bg-slate-900">Веб-разработка</option>
                    <option value="mobile" className="bg-slate-900">Мобильные приложения</option>
                    <option value="design" className="bg-slate-900">Дизайн</option>
                    <option value="crm" className="bg-slate-900">CRM-система</option>
                    <option value="bot" className="bg-slate-900">Боты</option>
                    <option value="other" className="bg-slate-900">Другое</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 flex items-center justify-center gap-2 font-medium hover:scale-[1.02]"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group block p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <info.icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">{info.title}</div>
                      <div className="text-lg font-medium group-hover:text-white transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Info Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent backdrop-blur-sm border border-white/10">
              <div className="flex items-start gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" strokeWidth={2} />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Быстрый ответ</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Отвечаем на все заявки в течение часа в рабочее время (пн-пт, 9:00-18:00 МСК)
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05]">
              <h3 className="text-lg font-semibold mb-4">Связаться удобным способом</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Выбирайте любой удобный канал связи — Telegram, WhatsApp, Email или телефон. Мы всегда на связи!
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Telegram', gradient: 'from-blue-500 to-cyan-500' },
                  { name: 'WhatsApp', gradient: 'from-emerald-500 to-teal-500' },
                  { name: 'Email', gradient: 'from-purple-500 to-pink-500' },
                ].map((messenger) => (
                  <button
                    key={messenger.name}
                    className={`p-4 rounded-xl bg-gradient-to-br ${messenger.gradient} hover:scale-105 transition-all text-center shadow-lg`}
                  >
                    <div className="text-xs font-medium">{messenger.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}