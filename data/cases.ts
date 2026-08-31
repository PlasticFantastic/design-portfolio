// src/data/cases.ts

export interface CaseItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  coverSrc: string;
  accentGradient: string;
}

export const ALL_CASES: CaseItem[] = [
  {
    id: 'slimmer',
    slug: 'slimmer',
    title: 'Slimmer — HealthTech Ecosystem',
    category: 'HealthTech',
    year: 'Mobile App',
    shortDescription: 'Трансформация трекера веса в полноценную HealthTech-платформу: Дашборд, телемедицина, таблетница, блог и анализы.',
    coverSrc: '/cases/slimmer/cover.webp',
    accentGradient: 'from-[#FF4D2D]/30 via-orange-500/10 to-transparent',
  },
  {
    id: 'slimmer-doc',
    slug: 'slimmer-doc',
    title: 'Slimmer Doc — Кабинет врача',
    category: 'HealthTech / B2B',
    year: 'Web App',
    shortDescription: 'Веб-сервис и рабочий кабинет для врачей: ведение пациентов, аналитика показателей и онлайн-консультирование.',
    coverSrc: '/cases/slimmer-doc/cover.webp',
    accentGradient: 'from-blue-600/30 via-cyan-500/10 to-transparent',
  },
  {
    id: 'uni',
    slug: 'uni',
    title: 'Юнисервис Капитал',
    category: 'FinTech',
    year: 'Web',
    shortDescription: 'Сайт для инвестиционной компании с комплексом услуг для эмитентов, аналитикой и решениями для привлечения капитала.',
    coverSrc: '/cases/uni/cover.webp',
    accentGradient: 'from-emerald-600/30 via-teal-500/10 to-transparent',
  },
  {
    id: 'biotime',
    slug: 'biotime',
    title: 'Biotime',
    category: 'E-Commerce',
    year: 'Web',
    shortDescription: 'Дизайн интернет-магазина для сибирского разработчика инъекционных препаратов и средств профессионального и домашнего ухода.',
    coverSrc: '/cases/biotime/cover.webp',
    accentGradient: 'from-sky-600/30 via-indigo-500/10 to-transparent',
  },
  {
    id: 'vsesvoi',
    slug: 'vsesvoi',
    title: 'Vse Svoi',
    category: 'MarketPlace',
    year: 'Web',
    shortDescription: 'Цифровой сервис, который помогает русскоязычным пользователям находить специалистов и услуги во Франции.',
    coverSrc: '/cases/vsesvoi/cover.webp',
    accentGradient: 'from-purple-600/30 via-fuchsia-500/10 to-transparent',
  },
  {
    id: 'topface',
    slug: 'topface',
    title: 'Topface — интернет-магазин косметики',
    category: 'E-Commerce',
    year: 'Web',
    shortDescription: 'Дизайн интернет-магазина турецкого косметического бренда с каталогом продукции и удобным сценарием покупки.',
    coverSrc: '/cases/topface/cover.webp',
    accentGradient: 'from-pink-600/30 via-rose-500/10 to-transparent',
  },
  {
    id: 'letmebel',
    slug: 'letmebel',
    title: 'Letmebel',
    category: 'E-Commerce',
    year: 'Web',
    shortDescription: 'Интернет-магазин мебели с каталогом готовых решений и возможностью заказать мебель под индивидуальные параметры.',
    coverSrc: '/cases/letmebel/cover.webp',
    accentGradient: 'from-amber-600/30 via-orange-500/10 to-transparent',
  },
  {
    id: 'credit',
    slug: 'credit',
    title: 'Кредит Гарант',
    category: 'FinTech',
    year: 'Web',
    shortDescription: 'Дизайн ипотечной платформы для подбора и оформления финансовых решений для покупки недвижимости.',
    coverSrc: '/cases/credit/cover.webp',
    accentGradient: 'from-red-600/30 via-rose-500/10 to-transparent',
  },
  {
    id: 'alexdoors',
    slug: 'alexdoors',
    title: 'AlexDoors — Двери & Фурнитура',
    category: 'E-Commerce',
    year: 'Web',
    shortDescription: 'Корпоративный сайт и интернет-магазин с точным подбором параметров и фильтрацией.',
    coverSrc: '/cases/alexdoors/cover.webp',
    accentGradient: 'from-stone-600/30 via-zinc-500/10 to-transparent',
  },
];