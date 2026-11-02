'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');

  const footerLinks = {
    services: [
      { name: t('web'), href: '/services/veb-prilozheniya-i-sajty' as const },
      { name: t('mobile'), href: '/services/mobilnye-prilozheniya' as const },
      { name: t('ecommerce'), href: '/services/ecommerce-resheniya' as const },
      { name: t('bots'), href: '/services/telegram-whatsapp-boty' as const },
      { name: t('crm'), href: '/services/crm-sistemy' as const },
      { name: t('mvp'), href: '/services/it-produkty-pod-klyuch' as const },
    ],
    company: [
      { name: t('about'), href: '/about' as const },
      { name: t('work'), href: '/portfolio' as const },
    ],
    resources: [{ name: t('faq'), href: '/faq' as const }],
  };

  return (
    <footer className="border-t border-border">
      <div className="wrap">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/triada-logo.svg" alt="TRIADA GROUP" width={64} height={64} className="object-contain w-14 h-14" />
              <span className="text-lg">
                TRIADA <span className="text-muted">GROUP</span>
              </span>
            </Link>
            <p className="text-muted mb-6 leading-relaxed max-w-sm">{t('tagline')}</p>
            <a
              href="https://wa.me/77052401848"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-[12px] border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-sm tracking-wide uppercase text-muted">{t('services')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-text text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm tracking-wide uppercase text-muted">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-text text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm tracking-wide uppercase text-muted">{t('resources')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-text text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">© 2026 TRIADA GROUP.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 sm:gap-8 text-sm text-muted">
              <Link href="/privacy" className="hover:text-text">
                {t('privacy')}
              </Link>
              <Link href="/terms" className="hover:text-text">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
