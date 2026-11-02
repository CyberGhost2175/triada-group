'use client';

import { Mail, Clock, Send, ArrowRight, CheckCircle2, XCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/app/components/Reveal';

const SERVICE_KEYS = ['web', 'mobile', 'design', 'automation', 'unsure'] as const;
const BUDGET_KEYS = ['under5', '5to15', '15to50', '50plus'] as const;

export function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 5000);
    return () => clearTimeout(timer);
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
        setNotification({ type: 'error', message: data.error || t('error') });
        return;
      }

      setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' });
      setNotification({ type: 'success', message: t('success') });
    } catch {
      setNotification({ type: 'error', message: t('errorNetwork') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section id="contact" className="page-section">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p className="section-label mb-4">{t('badge')}</p>
          <h2 className="mb-5">{t('title')}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">{t('subtitle')}</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              {notification && (
                <div
                  className={`card p-4 flex items-start gap-3 ${
                    notification.type === 'success' ? 'text-text' : 'text-text'
                  }`}
                >
                  {notification.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  )}
                  <p className="text-sm leading-snug flex-1">{notification.message}</p>
                  <button type="button" onClick={() => setNotification(null)} aria-label={t('close')}>
                    <X className="w-4 h-4 text-muted" strokeWidth={1.5} />
                  </button>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="field"
                    placeholder={t('namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-muted mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="field"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm text-muted mb-2">
                  {t('company')} <span className="text-muted/80">({t('companyOptional')})</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="field"
                  placeholder={t('companyPlaceholder')}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="service" className="block text-sm text-muted mb-2">
                    {t('service')}
                  </label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} className="field">
                    <option value="" className="bg-surface">
                      {t('servicePlaceholder')}
                    </option>
                    {SERVICE_KEYS.map((key) => (
                      <option key={key} value={key} className="bg-surface">
                        {t(`options.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm text-muted mb-2">
                    {t('budget')}
                  </label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="field">
                    <option value="" className="bg-surface">
                      {t('budgetPlaceholder')}
                    </option>
                    {BUDGET_KEYS.map((key) => (
                      <option key={key} value={key} className="bg-surface">
                        {t(`budgets.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-muted mb-2">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="field resize-none"
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
                {isSubmitting ? t('submitting') : t('submit')}
                <Send className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </form>
          </Reveal>

          <Reveal>
            <div className="space-y-4">
              <div className="card p-7">
                <h3 className="mb-3">{t('preferCall')}</h3>
                <a
                  href="https://wa.me/77052401848"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-text"
                >
                  {t('bookCall')}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>

              <a href="mailto:triada.workspace@gmail.com" className="card p-6 flex items-start gap-4 hover:border-accent/40">
                <Mail className="w-5 h-5 text-accent mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-muted mb-1">Email</div>
                  <div>triada.workspace@gmail.com</div>
                </div>
              </a>

              <div className="card p-6 flex items-start gap-4">
                <Clock className="w-5 h-5 text-accent mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-muted mb-1">{t('hoursTitle')}</div>
                  <div>{t('hours')}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
