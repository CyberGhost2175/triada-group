import type { LucideIcon } from 'lucide-react';
import {
  Globe,
  ShoppingCart,
  MessageSquare,
  Smartphone,
  Database,
  Sparkles,
} from 'lucide-react';

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  gradient: string;
  tags: string[];
  priceFrom: number;
  priceTo: number;
};

export const servicesData: ServiceItem[] = [
  {
    slug: 'veb-prilozheniya-i-sajty',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['React', 'Next.js', 'Node.js'],
    priceFrom: 150000,
    priceTo: 1500000,
  },
  {
    slug: 'mobilnye-prilozheniya',
    icon: Smartphone,
    gradient: 'from-orange-500 to-red-500',
    tags: ['iOS', 'Android', 'React Native'],
    priceFrom: 600000,
    priceTo: 4000000,
  },
  {
    slug: 'ecommerce-resheniya',
    icon: ShoppingCart,
    gradient: 'from-purple-500 to-pink-500',
    tags: ['Shopify', 'Custom', 'Stripe'],
    priceFrom: 400000,
    priceTo: 3500000,
  },
  {
    slug: 'telegram-whatsapp-boty',
    icon: MessageSquare,
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['Telegram', 'WhatsApp', 'OpenAI'],
    priceFrom: 100000,
    priceTo: 800000,
  },
  {
    slug: 'crm-sistemy',
    icon: Database,
    gradient: 'from-violet-500 to-fuchsia-500',
    tags: ['CRM', 'Dashboards', 'Electron'],
    priceFrom: 500000,
    priceTo: 3000000,
  },
  {
    slug: 'it-produkty-pod-klyuch',
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-500',
    tags: ['Prototype', 'MVP', 'Launch'],
    priceFrom: 1000000,
    priceTo: 8000000,
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
