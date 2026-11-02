import type { LucideIcon } from 'lucide-react';
import { Palette, Smartphone, Layers } from 'lucide-react';

export type DesignServiceItem = {
  slug: string;
  icon: LucideIcon;
  gradient: string;
  priceFrom: number;
  priceTo: number;
};

export const designServicesData: DesignServiceItem[] = [
  {
    slug: 'ui-ux-dizajn',
    icon: Palette,
    gradient: 'from-blue-500 to-purple-500',
    priceFrom: 200000,
    priceTo: 800000,
  },
  {
    slug: 'mobilnyj-dizajn',
    icon: Smartphone,
    gradient: 'from-purple-500 to-pink-500',
    priceFrom: 150000,
    priceTo: 600000,
  },
  {
    slug: 'dizajn-sistemy',
    icon: Layers,
    gradient: 'from-emerald-500 to-teal-500',
    priceFrom: 250000,
    priceTo: 1000000,
  },
];

export function getDesignServiceBySlug(slug: string): DesignServiceItem | undefined {
  return designServicesData.find((s) => s.slug === slug);
}

export function getAllDesignServiceSlugs(): string[] {
  return designServicesData.map((s) => s.slug);
}
