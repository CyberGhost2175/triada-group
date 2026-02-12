import type { LucideIcon } from 'lucide-react';
import { Palette, Smartphone, Monitor, Home } from 'lucide-react';

export type DesignServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  fullDescription: string;
  gradient: string;
  features: string[];
  priceFrom: number;
  priceTo: number;
  priceNote?: string;
};

export const designServicesData: DesignServiceItem[] = [
  {
    slug: 'ui-ux-dizajn',
    icon: Palette,
    title: 'UI/UX дизайн',
    shortDescription:
      'Создаём интуитивные интерфейсы, которые влюбляют пользователей с первого взаимодействия',
    fullDescription:
      'Исследуем аудиторию, проектируем сценарии и визуализируем интерфейсы. Включает user research, wireframes, прототипы, визуальный дизайн и дизайн-системы. Результат — удобный и узнаваемый продукт с продуманным пользовательским опытом.',
    gradient: 'from-blue-500 to-purple-500',
    features: ['User Research', 'Prototyping', 'Usability Testing', 'Design Systems'],
    priceFrom: 200000,
    priceTo: 800000,
    priceNote: 'Зависит от количества экранов, сложности логики и этапов (research, прототип, UI).',
  },
  {
    slug: 'mobilnyj-dizajn',
    icon: Smartphone,
    title: 'Мобильный дизайн',
    shortDescription:
      'Адаптивные дизайны для iOS и Android с вниманием к каждому пикселю и жесту',
    fullDescription:
      'Дизайн мобильных приложений по гайдлайнам Apple и Google: навигация, жесты, адаптивность под разные экраны, микро-анимации и accessibility. Подготовка макетов для разработки и дизайн-спеки для iOS и Android.',
    gradient: 'from-purple-500 to-pink-500',
    features: ['iOS Guidelines', 'Material Design', 'Adaptive UI', 'Micro-animations'],
    priceFrom: 150000,
    priceTo: 600000,
    priceNote: 'Оценка по количеству экранов и необходимости анимаций.',
  },
  {
    slug: 'web-mobile-interfejsy',
    icon: Monitor,
    title: 'Web & Mobile интерфейсы',
    shortDescription:
      'Комплексный подход к созданию цифровых продуктов на всех платформах',
    fullDescription:
      'Единая визуальная и UX-концепция для веба и мобильных приложений: брендинг, компонентная библиотека, адаптивные сетки и доступность. Обеспечиваем консистентность продукта на всех устройствах и платформах.',
    gradient: 'from-emerald-500 to-teal-500',
    features: ['Responsive Design', 'Accessibility', 'Branding', 'Component Library'],
    priceFrom: 250000,
    priceTo: 1000000,
    priceNote: 'Стоимость зависит от объёма платформ и глубины проработки бренда.',
  },
  {
    slug: 'dizajn-intererov',
    icon: Home,
    title: 'Дизайн интерьеров',
    shortDescription:
      'Создаём гармоничные пространства для офисов, магазинов и жилых помещений',
    fullDescription:
      'Планировка пространства, подбор материалов и мебели, 3D-визуализация и авторский надзор. Работаем с офисами, ритейлом и жилыми интерьерами — от концепции до реализации с учётом бюджета и сроков.',
    gradient: 'from-orange-500 to-red-500',
    features: ['3D Visualization', 'Space Planning', 'Material Selection', 'Supervision'],
    priceFrom: 300000,
    priceTo: 1500000,
    priceNote: 'Зависит от площади, количества 3D-видов и этапа надзора.',
  },
];

export function getDesignServiceBySlug(slug: string): DesignServiceItem | undefined {
  return designServicesData.find((s) => s.slug === slug);
}

export function getAllDesignServiceSlugs(): string[] {
  return designServicesData.map((s) => s.slug);
}
