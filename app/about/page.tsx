'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Oswald } from 'next/font/google';

import HeroGlowCanvas from '@/components/HeroGlowCanvas';
import FullscreenMenu from '@/components/FullscreenMenu';

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

// Данные об опыте работы
const experiences = [
  {
    company: 'CHILLICODE',
    period: 'Январь 2024 — н.в.',
    role: 'Product Designer',
    project: 'Продукт Slimmer (iOS, Android, Web)',
    description:
      'Дневник для похудения до и после бариатрической операции.',
    tasks: [
      'Создание карты пользовательских сценариев (User Flow) с описанием логики',
      'Разработка графических прототипов',
      'Отрисовка новых экранов приложения с 0: дашборд, профиль, блог, таблетница, анализы, платные онлайн-консультации с врачами (чат, аудио / видео звонки), виджеты на Home Screen',
      'Подготовка и выгрузка материалов с описанной логикой для разработчиков в Figma',
      'Решение возникающих вопросов в процессе разработки',
      'Проведение дизайн-ревью тестовых сборок продукта до релиза, с указанием по пунктам на несоответствия по дизайну и найденные баги',
      'Поиск проблем и возможных улучшений в готовом продукте',
      'Дизайн приложений для врача, администратора и техподдержки',
    ],
    stack: ['Figma', 'UI/UX Architecture', 'Design Review', 'Design Systems', 'User Research'],
  },
  {
    company: 'Студия Т',
    period: 'Июнь 2023 — н.в. (part-time)',
    role: 'UX/UI Designer',
    project: 'Веб разработка',
    description:
      'Проведение исследований пользовательского поведения и проектирование оптимальных UX-структур.',
    tasks: [
      'Проведение исследований пользовательского поведения, проведение опросов, анализ данных и сбор обратной связи',
      'Разработка пользовательских путей и карт сайта для определения оптимальной навигации и структуры продукта',
      'Создание интерактивных прототипов и макетов пользовательского интерфейса с использованием инструмента Figma',
      'Создание анимаций и переходов между экранами для улучшения визуального впечатления и передачи информации',
      'Взаимодействие и сотрудничество с разработчиками, маркетологами, проектными менеджерами и клиентами',
      'Отслеживание и применение современных стандартов, лучших практик и трендов в области UX/UI дизайна',
      'Подготовка дизайн-документации, создание презентаций и обоснование принятых дизайн-решений',
      'Проведение дизайн-ревью, проверка каждого пикселя и формирование документа с правками',
    ],
    stack: ['Figma', 'Photoshop', 'Octopus', 'Tilda'],
  },
  {
    company: 'Request Design',
    period: 'Октябрь 2021 — июнь 2023',
    role: 'UX/UI Designer',
    project: 'Веб-сервисы и E-commerce',
    description:
      'Проектирование и оптимизация пользовательских интерфейсов для повышения конверсии и удобства.',
    tasks: [
      'Создание уникальных и привлекательных визуальных концепций и пользовательских интерфейсов для веб-сайтов',
      'Анализ текущего дизайна и функциональности сайта, адаптация к современным требованиям и внедрение новых решений',
      'Разработка индивидуальных графических элементов (логотипы, иконки, кнопки и брендовая графика)',
      'Разработка эффективных баннеров для повышения конверсии и привлечения целевой аудитории',
      'Сохранение принципов удобства использования и эргономики, создание прототипов и оптимизация интерфейсов',
    ],
    stack: ['Figma', 'Photoshop', 'Illustrator', 'Miro'],
  },
];

// Данные об образовании
const education = [
  {
    degree: 'МАГИСТР ПРИКЛАДНОЙ ИНФОРМАТИКИ',
    period: '2019 — 2021',
    faculty: 'Факультет информатики и IT-технологий',
    university: 'Таврическая академия КФУ им. В.И. Вернадского, г. Симферополь',
  },
  {
    degree: 'БАКАЛАВР ПРИКЛАДНОЙ ИНФОРМАТИКИ',
    period: '2015 — 2019',
    faculty: 'Факультет информатики и IT-технологий',
    university: 'Таврическая академия КФУ им. В.И. Вернадского, г. Симферополь',
  },
];

// Сбалансированная конфигурация точек вылета искр
const sparkProjects = [
  {
    src: '/cases/slimmer/cover.webp',
    targetX: -110,
    targetY: -80,
    rotate: -16,
    maxScale: 0.5,
    delay: 0,
  },
  {
    src: '/cases/alexdoors/cover.webp',
    targetX: 110,
    targetY: -85,
    rotate: 16,
    maxScale: 0.48,
    delay: 0.84,
  },
  {
    src: '/cases/letmebel/cover.webp',
    targetX: 100,
    targetY: 60,
    rotate: -12,
    maxScale: 0.45,
    delay: 1.68,
  },
  {
    src: '/cases/biotime/cover.webp',
    targetX: -100,
    targetY: 55,
    rotate: 10,
    maxScale: 0.45,
    delay: 2.52,
  },
  {
    src: '/cases/vsesvoi/cover.webp',
    targetX: 0,
    targetY: -115,
    rotate: 8,
    maxScale: 0.5,
    delay: 3.36,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
};

// Компонент анимированного заголовка с набором текста
function TypewriterHeading() {
  const phrases = [
    'цифровые продукты',
    'веб-сервисы',
    'мобильные приложения',
    'сложные интерфейсы',
    'пользовательские сценарии',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullPhrase = phrases[phraseIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullPhrase.slice(0, currentText.length + 1));
          if (currentText.length + 1 === fullPhrase.length) {
            setTimeout(() => setIsDeleting(true), 2200);
          }
        } else {
          setCurrentText(fullPhrase.slice(0, currentText.length - 1));
          if (currentText.length - 1 === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <h1 className={`${oswald.className} text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#111827] leading-[1.08] min-h-[2.2em] sm:min-h-[2.1em]`}>
      Проектирую{' '}
      <br className="hidden sm:block" />
      <span className="text-[#FF4D2D] inline-block relative">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
          className="inline-block w-[3px] sm:w-[4px] lg:w-[5px] h-[0.82em] bg-[#FF4D2D] align-baseline ml-1 -mb-1"
        />
      </span>
    </h1>
  );
}

// Контейнер фото с плавным покачиванием
function RevealPhotoCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto lg:ml-auto rounded-3xl p-2.5 bg-white/70 border border-gray-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-md group cursor-pointer select-none transition-all duration-500 hover:border-[#FF4D2D]/40 hover:shadow-[0_25px_60px_rgba(255,77,45,0.18)]"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#111827]">
        
        {/* Базовое фото */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/img/about-me.png"
            alt="Nikolay Vishnev"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Второе фото с круговым раскрытием (Circle Mask) */}
        <motion.div
          className="absolute inset-0 z-10"
          initial={false}
          animate={{
            clipPath: isHovered
              ? 'circle(140% at 100% 0%)'
              : 'circle(0% at 100% 0%)',
            scale: isHovered ? 1.04 : 1.12,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src="/img/about-me-hover.png"
            alt="Nikolay Vishnev Hover"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        </motion.div>

        {/* Скользящий световой блик */}
        <motion.div
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 0.9,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
        />

        {/* Фиксированная плашка */}
        <div className="absolute bottom-3 left-3 z-30 px-3 py-1 rounded-full bg-[#111827]/90 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>NIKOLAY VISHNEV</span>
        </div>

      </div>
    </motion.div>
  );
}

// Кнопка перехода к проектам с оптимизированной плавностью искр
function ProjectsSparkButton() {
  return (
    <div className="relative py-16 sm:py-20 flex justify-center items-center">
      
      {/* Точный геометрический центр для вылета искр */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none z-0">
        {sparkProjects.map((spark, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.1, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.8, 0.5, 0],
              scale: [0.1, spark.maxScale, spark.maxScale * 0.85, 0.1],
              x: [0, spark.targetX * 0.35, spark.targetX * 0.85, spark.targetX],
              y: [0, spark.targetY * 0.35, spark.targetY * 0.85, spark.targetY],
              rotate: [0, spark.rotate * 0.35, spark.rotate * 0.85, spark.rotate],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              repeatDelay: 0,
              delay: spark.delay,
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.2, 0.75, 1],
            }}
            style={{ willChange: 'transform, opacity' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 sm:w-16 aspect-[16/10] rounded-lg overflow-hidden border border-white shadow-md bg-[#111827] transform-gpu pointer-events-none"
          >
            <Image
              src={spark.src}
              alt="Project Spark"
              fill
              sizes="64px"
              className="object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Кнопка */}
      <Link
        href="/cases"
        className="group relative z-10 inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-[#111827] text-white text-xs font-mono font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-[#FF4D2D] hover:shadow-[0_0_40px_rgba(255,77,45,0.45)] hover:scale-105 active:scale-95 border border-white/10"
      >
        {/* Скользящий блик */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        <span>Смотреть проекты</span>
        
        <motion.svg
          className="w-4 h-4 text-[#FF4D2D] group-hover:text-white transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </motion.svg>
      </Link>
    </div>
  );
}

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const [experienceText, setExperienceText] = useState('');
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Автоматический расчёт стажа с Октября 2021
    const startDate = new Date(2021, 9, 1);
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    const getPlural = (num: number, one: string, two: string, five: string) => {
      let n = Math.abs(num) % 100;
      if (n >= 5 && n <= 20) return five;
      n %= 10;
      if (n === 1) return one;
      if (n >= 2 && n <= 4) return two;
      return five;
    };

    const yStr = years > 0 ? `${years} ${getPlural(years, 'год', 'года', 'лет')}` : '';
    const mStr = months > 0 ? `${months} ${getPlural(months, 'месяц', 'месяца', 'месяцев')}` : '';

    setExperienceText([yStr, mStr].filter(Boolean).join(' '));
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        if (window.innerWidth < 1024) {
          setFooterHeight(0);
        } else {
          setFooterHeight(footerRef.current.getBoundingClientRect().height);
        }
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    if (footerRef.current) observer.observe(footerRef.current);

    window.addEventListener('resize', updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <main className="relative w-full bg-[#111827] text-[#111827] overflow-x-hidden font-sans select-none antialiased">
      
      {/* Полноэкранное меню */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ФИКСИРОВАННАЯ КНОПКА «НАЗАД» */}
      <Link
        href="/"
        className="fixed top-3.5 left-3.5 sm:top-5 sm:left-6 z-50 group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#111827]/90 hover:bg-[#FF4D2D] text-white backdrop-blur-md border border-white/10 shadow-2xl shadow-black/20 transition-all duration-300 text-xs font-mono font-semibold uppercase tracking-wider hover:scale-105 active:scale-95"
      >
        <svg
          className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-300 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span className="hidden sm:inline">Назад</span>
      </Link>

      {/* ХЕДЕР */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none flex justify-center">
        <AnimatePresence>
          {!isMenuOpen && (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex flex-col items-center"
            >
              <button
                onClick={() => setIsMenuOpen(true)}
                className="group relative flex items-center justify-center gap-3 px-10 sm:px-14 pt-3 pb-3.5 bg-[#111827] text-white text-xs font-mono font-semibold uppercase tracking-widest rounded-b-2xl shadow-2xl shadow-black/15 border-b border-x border-white/10 hover:bg-[#FF4D2D] transition-all duration-300 hover:pt-4 hover:pb-4 cursor-pointer min-w-[200px]"
              >
                <svg
                  className="absolute -left-4 -top-px w-4 h-4 text-[#111827] group-hover:text-[#FF4D2D] transition-colors fill-current pointer-events-none -scale-x-100"
                  viewBox="0 0 16 16"
                >
                  <path d="M 16 0 A 16 16 0 0 0 0 16 L 0 0 Z" />
                </svg>

                <svg
                  className="absolute -right-4 -top-px w-4 h-4 text-[#111827] group-hover:text-[#FF4D2D] transition-colors fill-current pointer-events-none"
                  viewBox="0 0 16 16"
                >
                  <path d="M 16 0 A 16 16 0 0 0 0 16 L 0 0 Z" />
                </svg>

                <span className="w-2 h-2 rounded-full bg-[#FF4D2D] group-hover:bg-white transition-colors animate-pulse" />
                <span>Меню</span>
                <span className="text-gray-400 group-hover:text-white transition-colors group-hover:translate-y-0.5 text-xs ml-0.5">
                  ↓
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ОСНОВНОЙ СВЕТЛЫЙ КОНТЕНТ (ВЕРХНИЙ СЛОЙ) */}
      <div 
        className="relative z-10 w-full bg-[#F8F9FA] rounded-b-[32px] sm:rounded-b-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] pt-20 lg:pt-24 pb-8 lg:pb-12 border-b border-gray-300"
        style={{ marginBottom: `${footerHeight}px` }}
      >
        <HeroGlowCanvas />

        <section className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-8 lg:py-12 space-y-16 lg:space-y-24">
          
          {/* HERO / ИНТРО */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp} 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200/80 shadow-xs backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" />
                <span className="text-[10px] font-mono font-bold text-[#111827] tracking-widest uppercase">
                  // ОБО МНЕ
                </span>
              </div>

              <TypewriterHeading />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-gray-600 text-base sm:text-lg font-normal leading-relaxed">
                <p>
                  Специализируюсь на веб-сервисах, мобильных приложениях и сложных интерфейсах.
                </p>
                <p>
                  Помогаю превращать сложные процессы и большие объёмы данных в понятный пользовательский опыт. Работаю с продуктом от исследования и проектирования до сопровождения разработки.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <RevealPhotoCard />
            </div>
          </motion.div>

          {/* СЕКЦИЯ: ОПЫТ РАБОТЫ */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200/80 pb-4">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <h2 className={`${oswald.className} text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#111827]`}>
                  Опыт работы
                </h2>
                {experienceText && (
                  <span className="text-xs sm:text-sm font-mono text-gray-400 font-medium">
                    ({experienceText})
                  </span>
                )}
              </div>

              <a
                href="/cv-vishnev-designer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="hidden sm:inline-block text-[11px] font-mono text-gray-400 uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                [&nbsp;<span className="text-[#FF4D2D] font-bold">СКАЧАТЬ РЕЗЮМЕ</span>&nbsp;]
              </a>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <motion.div
                  key={exp.company}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="p-6 sm:p-8 rounded-2xl bg-white/80 border border-gray-200/80 shadow-xs backdrop-blur-md hover:border-[#FF4D2D]/50 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-[#111827] text-white font-mono text-[11px] font-semibold">
                        {exp.period}
                      </span>
                      <h3 className="text-2xl font-bold text-[#111827] pt-1">
                        {exp.company}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#FF4D2D]">
                        {exp.role}
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        {exp.project}
                      </p>
                    </div>

                    <div className="lg:col-span-8 space-y-5">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed border-l-2 border-[#FF4D2D] pl-3">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
                          Основные задачи:
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                          {exp.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#FF4D2D] font-bold">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-gray-100 text-[11px] font-mono font-semibold text-gray-600 border border-gray-200/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* СЕКЦИЯ: ОБРАЗОВАНИЕ */}
          <div className="space-y-8">
            <div className="border-b border-gray-200/80 pb-4">
              <h2 className={`${oswald.className} text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#111827]`}>
                Образование
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <motion.div
                  key={edu.degree}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="p-6 sm:p-8 rounded-2xl bg-white/80 border border-gray-200/80 shadow-xs backdrop-blur-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px] font-bold">
                      {edu.period}
                    </span>
                    <h3 className="text-lg font-bold text-[#111827] pt-1">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-mono text-gray-500">
                      {edu.faculty}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 text-xs font-mono text-gray-400">
                    {edu.university}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Анимированная кнопка перехода к проектам с эффектом искр */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <ProjectsSparkButton />
            </motion.div>
          </div>

        </section>
      </div>

      {/* ТЕМНАЯ СЕКЦИЯ: FIXED REVEAL (НИЖНИЙ СЛОЙ) */}
      <div 
        ref={footerRef}
        className="relative lg:fixed lg:bottom-0 lg:left-0 w-full z-0 flex flex-col"
      >
        <section className="relative w-full bg-[#111827] text-white py-12 sm:py-16 lg:py-24 px-6 md:px-12 lg:px-16 border-t border-gray-800/80 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF4D2D]/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* СЛЕВА: КОМПАКТНЫЙ БЛОК CV / РЕЗЮМЕ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group relative lg:col-span-4 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-8 hover:border-[#FF4D2D]/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              <div className="absolute top-4 right-4 font-mono text-[10px] text-white/20 select-none pointer-events-none">
                + 01 / DOC
              </div>
              <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#FF4D2D]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF4D2D]/25 transition-all duration-500" />
              <svg
                className="absolute right-4 bottom-4 w-32 h-32 text-white/[0.03] pointer-events-none transform translate-x-4 translate-y-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>

              <div className="space-y-4 z-10">
                <div className="inline-block px-3.5 py-1 rounded-full bg-[#FF4D2D]/15 border border-[#FF4D2D]/30 text-[11px] font-mono font-bold tracking-wider text-[#FF4D2D] uppercase">
                  // РЕЗЮМЕ
                </div>

                <h3 className={`${oswald.className} text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight`}>
                  Резюме PDF
                </h3>
                
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Полный стек, опыт работы и описание кейсов в одном документе.
                </p>
              </div>

              <div className="z-10 pt-2">
                <a
                  href="/cv-vishnev-designer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-[#FF4D2D] hover:text-white text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/15 hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-[#FF4D2D]/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg
                    className="w-4 h-4 text-white/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Скачать PDF</span>
                </a>
              </div>
            </motion.div>

            {/* СПРАВА: БЛОК С КНОПКАМИ СВЯЗИ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group relative lg:col-span-8 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-8 hover:border-[#FF4D2D]/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              <div className="absolute top-4 right-4 font-mono text-[10px] text-white/20 select-none pointer-events-none">
                + 02 / CONNECT
              </div>
              <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#FF4D2D]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF4D2D]/30 transition-all duration-500" />
              
              <svg
                className="absolute right-6 bottom-6 w-48 h-48 text-white/[0.03] pointer-events-none"
                fill="none"
                viewBox="0 0 200 200"
                stroke="currentColor"
              >
                <circle cx="100" cy="100" r="80" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="50" strokeWidth="0.5" />
                <path d="M100 0v200M0 100h200" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>

              <div className="relative z-10 space-y-4">
                <div className="inline-block px-3.5 py-1 rounded-full bg-[#FF4D2D]/15 border border-[#FF4D2D]/30 text-[11px] font-mono font-bold tracking-wider text-[#FF4D2D] uppercase">
                  // СОТРУДНИЧЕСТВО
                </div>

                <h3 className={`${oswald.className} text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight`}>
                  Есть проект или идея?
                </h3>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl">
                  Всегда открыт к обсуждению новых продуктов, задач по проектированию и дизайну. Напишите мне в удобном мессенджере или на почту.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://t.me/goldsprites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FF4D2D] hover:bg-white hover:text-[#111827] text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#FF4D2D]/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.331.016.115.035.371.019.571z"/>
                  </svg>
                  <span>
                    <span className="hidden sm:inline">Telegram: </span>@goldsprites
                  </span>
                </a>

                <a
                  href="mailto:greensprites@gmail.com"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white hover:text-[#111827] text-white font-mono font-bold text-xs uppercase tracking-widest border border-white/15 hover:border-transparent transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>greensprites@gmail.com</span>
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        <footer className="relative w-full px-6 md:px-12 lg:px-16 py-5 border-t border-gray-800 bg-[#111827] text-[11px] font-mono text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>© 2026 NIKOLAY VISHNEV — ALL RIGHTS RESERVED</div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline">UTC+3 (MOSCOW)</span>
            <span className="hidden md:inline">•</span>
            <a href="https://t.me/goldsprites" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase">
              Get in touch ↗
            </a>
          </div>
        </footer>
      </div>

    </main>
  );
}