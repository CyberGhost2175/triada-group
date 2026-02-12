import type { LucideIcon } from 'lucide-react';
import {
  Globe,
  ShoppingCart,
  MessageSquare,
  Smartphone,
  Monitor,
  Database,
  Sparkles,
} from 'lucide-react';

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  description: string;
  fullDescription: string;
  gradient: string;
  tags: string[];
  priceFrom: number;
  priceTo: number;
  priceNote?: string;
  features: string[];
};

export const servicesData: ServiceItem[] = [
  {
    slug: 'veb-prilozheniya-i-sajty',
    icon: Globe,
    title: 'Веб-приложения и сайты',
    shortDescription: 'Современные веб-решения любой сложности с безупречным UX',
    description: 'Современные веб-решения любой сложности с безупречным UX',
    fullDescription:
      'Разрабатываем корпоративные сайты, лендинги и веб-приложения на React и Next.js. Адаптивная вёрстка, быстрая загрузка, SEO-оптимизация и удобная админ-панель. Под ключ: от прототипа до размещения на хостинге.',
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['React', 'Next.js', 'Node.js'],
    priceFrom: 150000,
    priceTo: 1500000,
    priceNote: 'Точная стоимость зависит от объёма страниц, дизайна и интеграций.',
    features: [
      'Адаптивная вёрстка под все устройства',
      'SEO и быстрая загрузка',
      'Админ-панель для управления контентом',
      'Интеграция с аналитикой и CRM',
      'Поддержка после запуска',
    ],
  },
  {
    slug: 'ecommerce-resheniya',
    icon: ShoppingCart,
    title: 'E-commerce решения',
    shortDescription: 'Интернет-магазины с высокой конверсией и интеграцией платёжных систем',
    description: 'Интернет-магазины с высокой конверсией и интеграцией платёжных систем',
    fullDescription:
      'Создаём интернет-магазины и маркетплейсы: каталог, корзина, оплата (в т.ч. Kaspi Pay, Halyk Bank), личный кабинет, складской учёт. Готовые решения на базе платформ или кастомная разработка под вашу модель бизнеса.',
    gradient: 'from-purple-500 to-pink-500',
    tags: ['Shopify', 'WooCommerce', 'Custom'],
    priceFrom: 400000,
    priceTo: 3500000,
    priceNote: 'Цена зависит от количества товаров, способов оплаты и интеграций.',
    features: [
      'Интеграция с Kaspi Pay, Halyk и другими платёжными системами КЗ',
      'Удобный каталог и фильтры',
      'Личный кабинет и история заказов',
      'Складской учёт и отчёты',
      'Мобильная версия и PWA',
    ],
  },
  {
    slug: 'telegram-whatsapp-boty',
    icon: MessageSquare,
    title: 'Telegram / WhatsApp боты',
    shortDescription: 'Умные боты для автоматизации бизнес-процессов и коммуникации',
    description: 'Умные боты для автоматизации бизнес-процессов и коммуникации',
    fullDescription:
      'Боты для приёма заказов, консультаций, рассылок и автоматизации рутины. Интеграция с CRM, платёжными системами и базами данных. Поддержка AI для ответов на вопросы и сбора лидов.',
    gradient: 'from-emerald-500 to-teal-500',
    tags: ['AI', 'Automation', 'Integration'],
    priceFrom: 100000,
    priceTo: 800000,
    priceNote: 'Стоимость зависит от сценариев, интеграций и объёма сообщений.',
    features: [
      'Приём заказов и записей через мессенджер',
      'Интеграция с CRM и 1С',
      'Рассылки и уведомления',
      'Опционально: AI-ответы и распознавание запросов',
      'Аналитика и отчёты',
    ],
  },
  {
    slug: 'mobilnye-prilozheniya',
    icon: Smartphone,
    title: 'Мобильные приложения',
    shortDescription: 'Нативные iOS и Android приложения с современным дизайном',
    description: 'Нативные iOS и Android приложения с современным дизайном',
    fullDescription:
      'Приложения для iOS и Android: нативная разработка или кроссплатформа (React Native). От простого приложения до сервисов с авторизацией, платежами, геолокацией и push-уведомлениями. Публикация в App Store и Google Play.',
    gradient: 'from-orange-500 to-red-500',
    tags: ['iOS', 'Android', 'React Native'],
    priceFrom: 600000,
    priceTo: 4000000,
    priceNote: 'От MVP до полнофункционального продукта.',
    features: [
      'Одновременно iOS и Android (кроссплатформа)',
      'Дизайн по гайдлайнам Apple и Google',
      'Платежи, карты, push-уведомления',
      'Публикация в сторы и сопровождение обновлений',
      'Поддержка и доработки',
    ],
  },
  {
    slug: 'desktopnye-prilozheniya',
    icon: Monitor,
    title: 'Десктопные приложения',
    shortDescription: 'Кросс-платформенные решения для Windows, macOS и Linux',
    description: 'Кросс-платформенные решения для Windows, macOS и Linux',
    fullDescription:
      'Десктопные приложения на Electron или Tauri: одна кодовая база для Windows, macOS и Linux. Подходят для внутренних корпоративных систем, утилит, инструментов для работы с данными и медиа.',
    gradient: 'from-indigo-500 to-purple-500',
    tags: ['Electron', 'Tauri', 'Native'],
    priceFrom: 500000,
    priceTo: 2500000,
    priceNote: 'Зависит от сложности логики и количества платформ.',
    features: [
      'Одно приложение — Windows, macOS, Linux',
      'Работа офлайн и с локальными данными',
      'Автообновления и безопасность',
      'Интеграция с системными сервисами',
      'Установщики и лицензирование',
    ],
  },
  {
    slug: 'crm-sistemy',
    icon: Database,
    title: 'CRM-системы',
    shortDescription: 'Индивидуальные CRM с аналитикой и автоматизацией продаж',
    description: 'Индивидуальные CRM с аналитикой и автоматизацией продаж',
    fullDescription:
      'CRM под ваши процессы: контакты, сделки, воронки, задачи, отчёты. Интеграция с телефонией, почтой, мессенджерами и 1С. Автоматизация сценариев и дашборды для руководителя.',
    gradient: 'from-violet-500 to-fuchsia-500',
    tags: ['Custom CRM', 'Analytics', 'Integration'],
    priceFrom: 500000,
    priceTo: 3000000,
    priceNote: 'Оценка после анализа процессов и количества пользователей.',
    features: [
      'Воронки продаж и этапы сделок',
      'Задачи, напоминания, календарь',
      'Интеграция с телефонией и почтой',
      'Отчёты и аналитика в реальном времени',
      'Роли и права доступа',
    ],
  },
  {
    slug: 'it-produkty-pod-klyuch',
    icon: Sparkles,
    title: 'IT-продукты под ключ',
    shortDescription: 'Полный цикл: от идеи и прототипа до запуска и поддержки',
    description: 'Полный цикл: от идеи и прототипа до запуска и поддержки',
    fullDescription:
      'Ведём проект от идеи до продукта: исследование, прототип, дизайн, разработка, тестирование, запуск и пост-релизная поддержка. Подходит для стартапов и компаний, которые хотят один контракт на весь цикл.',
    gradient: 'from-amber-500 to-orange-500',
    tags: ['Full-cycle', 'MVP', 'Support'],
    priceFrom: 1000000,
    priceTo: 8000000,
    priceNote: 'Стоимость определяется объёмом продукта и сроками. Возможна поэтапная оплата.',
    features: [
      'Исследование рынка и прототип (MVP)',
      'UI/UX дизайн и разработка',
      'Тестирование и запуск',
      'Поддержка и развитие после запуска',
      'Единая команда и один контракт',
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
