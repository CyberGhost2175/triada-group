'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { LegalModals } from '@/app/components/LegalModals';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const footerLinks = {
    services: [
      { name: 'Веб-разработка', href: '/services/veb-prilozheniya-i-sajty' },
      { name: 'Мобильные приложения', href: '/services/mobilnye-prilozheniya' },
      { name: 'UI/UX дизайн', href: '/design/ui-ux-dizajn' },
      { name: 'CRM-системы', href: '/services/crm-sistemy' },
      { name: 'Боты', href: '/services/telegram-whatsapp-boty' },
    ],
    company: [
      { name: 'О компании', href: '/about' },
      { name: 'Портфолио', href: '/portfolio' },
    ],
    resources: [
      { name: 'Технологии', href: '/#tech' },
      { name: 'Процесс работы', href: '/#process' },
      { name: 'FAQ', href: '/faq' },
    ],
  };

  const socialLinks = [
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@triada.company?_r=1&_t=ZS-93tbIUTBCPB', label: 'TikTok', color: 'hover:text-gray-400' },
    { icon: Instagram, href: 'https://www.instagram.com/triada.workspace?igsh=MTFqZmthc2wxNnFqMw==', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: TelegramIcon, href: 'https://t.me/triada_workspace', label: 'Telegram', color: 'hover:text-sky-400' },
    { icon: WhatsAppIcon, href: 'https://wa.me/77051168680', label: 'WhatsApp', color: 'hover:text-emerald-400' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="#" className="flex items-center gap-3 mb-6 group">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <img
                    src="/triada-logo.svg"
                    alt="TRIADA GROUP"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xl font-semibold">
                  TRIADA <span className="text-slate-400">GROUP</span>
                </span>
              </a>
              
              <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
                Международная IT-студия премиум-класса. Создаём цифровые продукты, которые меняют бизнес.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/20 transition-all ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4 text-white">Услуги</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-white">Компания</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4 text-white">Ресурсы</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              © 2026 TRIADA GROUP.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 sm:gap-8 text-sm text-slate-500">
              <button
                type="button"
                onClick={() => setOpenPrivacy(true)}
                className="hover:text-white transition-colors text-left"
              >
                Политика конфиденциальности
              </button>
              <button
                type="button"
                onClick={() => setOpenTerms(true)}
                className="hover:text-white transition-colors text-left"
              >
                Условия использования
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <LegalModals
        openPrivacy={openPrivacy}
        openTerms={openTerms}
        onClosePrivacy={() => setOpenPrivacy(false)}
        onCloseTerms={() => setOpenTerms(false)}
      />

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </footer>
  );
}
