'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import FullscreenMenu from '@/components/FullscreenMenu';
import { MicroConfetti } from '@/components/MicroConfetti';
import { ALL_CASES } from '@/data/cases';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function StageBadge({ number }: { number: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200/90 shadow-xs text-[11px] font-mono font-bold text-gray-900 shrink-0 self-start sm:self-auto">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" />
      <span>ЭТАП {number}</span>
    </span>
  );
}

function CaseImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeInUp}
      className="my-6 sm:my-10 w-full"
    >
      <div className="block sm:hidden w-full h-auto rounded-2xl overflow-hidden shadow-sm border border-gray-200/60 bg-gray-100">
        <Image
          src={`/cases/slimmer/${src}`}
          alt={alt}
          width={896}
          height={504}
          className="w-full h-auto rounded-2xl object-cover"
          priority={src === 'sl-1.webp'}
        />
      </div>

      <div className="hidden sm:block relative w-full aspect-[16/9] rounded-3xl overflow-hidden isolate group bg-gray-100 border border-gray-200/60">
        <Image
          src={`/cases/slimmer/${src}`}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015] rounded-3xl"
          sizes="896px"
        />
      </div>
    </motion.figure>
  );
}

export default function SlimmerCasePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { scrollYProgress } = useScroll();

  // Отслеживаем прогресс скролла для финишной анимации
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.98 && !isFinished) {
      setIsFinished(true);
    } else if (latest < 0.95 && isFinished) {
      setIsFinished(false);
    }
  });

  // 1. Исключаем текущий кейс (проверяем все варианты slug Slimmer)
  const otherCases = ALL_CASES.filter((item) => {
    if (!item || !item.slug) return false;
    const slug = item.slug.toLowerCase();
    return slug !== 'slimmer' && slug !== 'slimmer-doc' && !slug.includes('slimmer');
  }).slice(0, 3);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (otherCases.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % otherCases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [otherCases.length]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (otherCases.length === 0) return;
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveSlide((prev) => (prev + 1) % otherCases.length);
    } else if (info.offset.x > swipeThreshold) {
      setActiveSlide((prev) => (prev - 1 + otherCases.length) % otherCases.length);
    }
  };

  const currentMobileCase = otherCases[activeSlide];

  // Универсальный хелпер для определения и формирования корректного пути к обложке
  const getCoverPath = (item: any) => {
    if (!item) return null;
    const src =
      item.coverImage ||
      item.preview ||
      item.previewImage ||
      item.thumbnail ||
      item.heroImage ||
      item.image ||
      item.cover ||
      item.img ||
      item.banner;

    if (!src) {
      return item.slug ? `/cases/${item.slug}/cover.webp` : null;
    }

    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    if (src.startsWith('/')) return src;
    if (src.includes('/')) return `/${src}`;

    return `/cases/${item.slug}/${src}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] text-[#111827] pb-16 sm:pb-24 relative selection:bg-[#FF4D2D] selection:text-white">
      
      {/* ОРАНЖЕВЫЙ ПРОГРЕСС-БАР ВНИЗУ ЭКРАНА */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            key="progress-bar"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4, transition: { duration: 0.3, ease: 'easeOut' } }}
            className="fixed bottom-0 left-0 right-0 h-1 bg-[#FF4D2D] origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(255,77,45,0.8)]"
            style={{ scaleX: scrollYProgress }}
          />
        )}
      </AnimatePresence>

      {/* ФИНИШНОЕ КОНФЕТТИ */}
      <AnimatePresence>
        {isFinished && <MicroConfetti key="confetti" />}
      </AnimatePresence>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ФИКСИРОВАННАЯ КНОПКА «НАЗАД» */}
      <Link
        href="/cases"
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
      <header className="fixed top-0 inset-x-0 z-40 pointer-events-none flex justify-center">
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

      {/* ОСНОВНОЙ КОНТЕЙНЕР */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 lg:pt-24 relative">
        <main>
          {/* HERO */}
          <section className="mb-12 sm:mb-16">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <span className="inline-block text-[11px] font-mono font-bold text-[#FF4D2D] uppercase tracking-widest bg-[#FF4D2D]/10 px-3 py-1 rounded-full border border-[#FF4D2D]/20 mb-4">
                healthtech
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.12] mb-6 text-gray-900">
                Slimmer — развитие приложения для контроля веса в полноценную HealthTech-платформу
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-5 sm:p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-1">Роль</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">Product Designer</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-1">Команда</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">PM, Аналитик, Devs</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-1">Платформы</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">iOS, Android, Web</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-1">Период</span>
                <span className="text-xs sm:text-sm font-bold text-[#FF4D2D]">2024 — н.в.</span>
              </div>
            </motion.div>
          </section>

          {/* О ПРОЕКТЕ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 sm:mb-20 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm"
          >
            <h2 className="text-xl sm:text-3xl font-black tracking-tight mb-4 text-gray-900">О проекте</h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Slimmer</strong> — цифровая платформа для людей, которые хотят контролировать вес, следить за показателями здоровья и получать консультации врачей.
              </p>
              <p>
                Приложение объединяет ежедневный мониторинг состояния организма, медицинские данные и взаимодействие со специалистами в едином интерфейсе.
              </p>
              <div className="p-4 bg-gray-50 border-l-4 border-[#FF4D2D] rounded-r-xl text-xs sm:text-sm text-gray-700 leading-relaxed my-4">
                Когда я присоединился к проекту, приложение уже существовало, но представляло собой минимальный MVP: пользователь мог только записывать свой вес и видеть индекс массы тела. Моей задачей стало превратить простой трекер в полноценный цифровой продукт, который помогает пользователю сопровождать свое здоровье на ежедневной основе.
              </div>
            </div>
          </motion.section>

          {/* ЭТАПЫ РАЗРАБОТКИ */}
          <div className="space-y-16 sm:space-y-24 mb-16 sm:mb-24">
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-4">
                <StageBadge number="01" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  Создание ядра продукта — Dashboard
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                  <h3 className="text-sm font-bold text-red-900 mb-2 flex items-center gap-1.5">
                    <span>⚠️</span> Проблема
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">
                    Пользователь видел только текущее значение веса. Не хватало понимания:
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Насколько изменился результат</li>
                    <li>Сколько осталось до цели</li>
                    <li>Как меняются показатели со временем</li>
                    <li>Какие привычки влияют на прогресс</li>
                  </ul>
                  <p className="mt-2.5 text-xs font-semibold text-red-800">
                    Главный экран не помогал принимать решения и не мотивировал возвращаться.
                  </p>
                </div>

                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                  <h3 className="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                    <span>💡</span> Решение
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    Я разработал новый Dashboard — центральный экран продукта, объединяющий всю ключевую информацию о прогрессе пользователя.
                  </p>
                </div>
              </div>

              <CaseImage src="sl-1.webp" alt="Dashboard Slimmer" />

              <div className="space-y-10">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Блок веса и целей</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    Основным элементом Dashboard стал блок текущего прогресса. Пользователь видит: текущий вес, стартовый вес, дату начала, текущий ИМТ, целевой вес, целевой ИМТ и график изменения веса.
                  </p>
                  <CaseImage src="sl-2.webp" alt="Блок веса и целей" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Дополнительные показатели</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    Чтобы пользователь видел изменения комплексно, я разработал дополнительные карточки: сброшенный вес, остаток до цели, категорию ИМТ и замеры тела (грудь, талия, бедра, руки).
                  </p>
                  <CaseImage src="sl-3.webp" alt="Дополнительные показатели и замеры" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Быстрое добавление данных</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    Горизонтальный календарь, фиксированная кнопка «+», быстрый выбор типа записи и гибкие сценарии ввода для ежедневного использования.
                  </p>
                  <CaseImage src="sl-4.webp" alt="Быстрое добавление данных" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Дополнительные разделы</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    Инструменты истории ИМТ, замеры тела и несколько пользовательских целей для анализа динамики.
                  </p>
                  <CaseImage src="sl-5.webp" alt="Дополнительные разделы и история" />
                </div>
              </div>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                <StageBadge number="02" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  Первый запуск и безопасная авторизация
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Авторизация по номеру телефона, вход по коду, Face ID и восстановление доступа. Для знакомства с продуктом был создан onboarding с использованием маскота проекта — кота Бари.
              </p>
              <CaseImage src="sl-6.webp" alt="Onboarding и Авторизация" />
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                <StageBadge number="03" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  Формирование полезных привычек
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Расширение Dashboard трекерами активности, водного баланса и настроения с подробной статистикой и графиками.
              </p>
              <CaseImage src="sl-7.webp" alt="Трекеры привычек" />
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                <StageBadge number="04" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  Профиль пользователя & Фото-прогресс
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Профиль включает персональные данные, медицинскую анкету, настройки, FAQ и отчеты.
              </p>
              <CaseImage src="sl-7-1.webp" alt="Профиль пользователя" />

              <div className="mt-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2">Фото-прогресс</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                  Сценарий сравнения снимков тела в различных ракурсах за разные периоды времени.
                </p>
                <CaseImage src="sl-8.webp" alt="Сравнение фото-прогресса" />
              </div>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                <StageBadge number="05" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  От трекера веса к персональному Health Hub
                </h2>
              </div>

              <div className="space-y-10 mt-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Таблетница</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    Контроль приема лекарств, графика дозировок и push-уведомления.
                  </p>
                  <CaseImage src="sl-9.webp" alt="Раздел Таблетница" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Анализы</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    Хранение медицинских документов по принципу файлового менеджера с мгновенным доступом для врача.
                  </p>
                  <CaseImage src="sl-10.webp" alt="Медицинские документы и анализы" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Блог</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    Образовательные материалы, тематические статьи и советы экспертов.
                  </p>
                  <CaseImage src="sl-11.webp" alt="Образовательный Блог и Сторис" />
                </div>
              </div>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                <StageBadge number="06" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  Темная тема и развитие дизайн-системы
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Система цветовых токенов и их автоматический экспорт из Figma в код для безупречной работы светлой и темной тем.
              </p>
              <CaseImage src="sl-12.webp" alt="Темная тема и Токены" />
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                <StageBadge number="07" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  Онлайн-консультации
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Каталог специалистов, отзывы, запись по времени и коммуникация внутри приложения через чат и видеозвонки.
              </p>
              <CaseImage src="sl-13.webp" alt="Онлайн консультации с врачами" />
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                <StageBadge number="08" />
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                  Адаптация продукта под Web
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Адаптивные сетки и сохранение единого пользовательского опыта между мобильным и веб-интерфейсом.
              </p>
              <CaseImage src="sl-14.webp" alt="Веб-версия Slimmer" />
            </motion.section>
          </div>

          {/* ПРОЦЕСС И РЕЗУЛЬТАТЫ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 sm:mb-24"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg sm:text-2xl font-black mb-4">Мой процесс работы</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Сопровождение задач на всех этапах разработки:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF4D2D] font-bold">1.</span> Анализ требований и исследование
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF4D2D] font-bold">2.</span> Сценарии использования (CJM)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF4D2D] font-bold">3.</span> Wireframes и UX-прототипы
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF4D2D] font-bold">4.</span> UI & Развитие Дизайн-системы
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF4D2D] font-bold">5.</span> Передача макетов в разработку
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF4D2D] font-bold">6.</span> Дизайн-ревью & Фокус-группы
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#111827] text-white p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FF4D2D] uppercase tracking-widest block mb-2">
                  Итог реализации
                </span>
                <h2 className="text-lg sm:text-2xl font-black mb-4">Результат</h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  За время работы Slimmer трансформировался из простого трекера веса в полноценную HealthTech-платформу, объединяющую контроль ИМТ, замеры, привычки, анализы, лекарства, блог и телемедицину на iOS, Android и Web.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-800">
                <span className="text-[11px] font-mono text-gray-400">
                  Полный UX/UI цикл + Design System
                </span>
              </div>
            </div>
          </motion.section>

          {/* БЛОК "СМОТРИТЕ ТАКЖЕ" */}
          <section className="mb-16 sm:mb-24 border-t border-gray-200/60 pt-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FF4D2D] tracking-widest block mb-1 uppercase">
                  Другие работы
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Смотрите также</h2>
              </div>
              <Link
                href="/cases"
                className="text-xs font-mono font-bold text-gray-500 hover:text-[#FF4D2D] transition-colors flex items-center gap-1"
              >
                Все проекты →
              </Link>
            </div>

            {/* ДЕСКТОПНАЯ СЕТКА */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-5">
              {otherCases.map((item, idx) => {
                const coverPath = getCoverPath(item);
                return (
                  <motion.div
                    key={item.id || item.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/cases/${item.slug}`}
                      className="group block relative w-full p-1.5 rounded-[22px] overflow-hidden bg-white shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 border border-gray-200/80 hover:border-[#FF4D2D]/40 active:scale-[0.99]"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-950 rounded-[18px] shadow-md shadow-black/10">
                        {coverPath ? (
                          <Image
                            src={coverPath}
                            alt={item.title || 'Обложка кейса'}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-tr ${item.gradient || 'from-gray-900 to-gray-800'} opacity-90`}
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                        {/* ВЕРХНИЕ БЕЙДЖИ */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                            {item.year || '2025'}
                          </span>
                        </div>

                        {/* НАЗВАНИЕ И ИКОНКА */}
                        <div className="absolute bottom-3 left-3 right-12 z-20 pointer-events-none">
                          <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">
                            {item.title}
                          </h3>
                        </div>

                        <div className="absolute bottom-3 right-3 z-30 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none">
                          <div className="w-8 h-8 rounded-full bg-[#FF4D2D] text-white flex items-center justify-center shadow-lg shadow-[#FF4D2D]/30">
                            <svg
                              className="w-4 h-4 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 17L17 7" />
                              <path d="M7 7h10v10" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* МОБИЛЬНЫЙ СЛАЙДЕР */}
            {currentMobileCase && (
              <div className="block sm:hidden relative touch-pan-y">
                <div className="overflow-hidden rounded-[22px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Link
                        href={`/cases/${currentMobileCase.slug}`}
                        className="group block relative w-full p-1 rounded-[22px] overflow-hidden bg-white shadow-sm border border-gray-200/80 active:scale-[0.98] transition-transform"
                      >
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-950 rounded-[18px] shadow-md shadow-black/10">
                          {getCoverPath(currentMobileCase) ? (
                            <Image
                              src={getCoverPath(currentMobileCase)!}
                              alt={currentMobileCase.title || 'Обложка кейса'}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div
                              className={`absolute inset-0 bg-gradient-to-tr ${currentMobileCase.gradient || 'from-gray-900 to-gray-800'} opacity-90`}
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                          <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                            <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                              {currentMobileCase.category}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                              {currentMobileCase.year || '2025'}
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-12 z-20 pointer-events-none">
                            <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">
                              {currentMobileCase.title}
                            </h3>
                          </div>

                          <div className="absolute bottom-3 right-3 z-30 pointer-events-none">
                            <div className="w-8 h-8 rounded-full bg-[#FF4D2D] text-white flex items-center justify-center shadow-lg">
                              <svg
                                className="w-4 h-4 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center items-center gap-2 mt-4">
                  {otherCases.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeSlide === idx ? 'w-6 bg-[#FF4D2D]' : 'w-2 bg-gray-300'
                      }`}
                      aria-label={`Перейти к слайду ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* КОНТАКТНЫЙ БЛОК */}
          <footer className="w-full bg-[#111827] text-white rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF4D2D]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FF4D2D] tracking-widest uppercase block mb-2">
                  Есть проект или задача?
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mb-2 leading-tight">
                  Давайте создадим что-то выдающееся вместе
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm max-w-lg leading-relaxed">
                  Открыт к предложениям по продуктовому дизайну, проектированию приложений и систем интерфейсов.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="mailto:contact@designer.com"
                  className="px-6 py-3.5 rounded-full bg-[#FF4D2D] hover:bg-white text-white hover:text-[#111827] font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#FF4D2D]/20 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span>Написать на почту</span>
                </a>

                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/15 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.05-.75 4.12-1.8 6.87-2.98 8.25-3.55 3.93-1.63 4.74-1.92 5.27-1.92.12 0 .38.03.55.17.14.12.18.28.2.42-.02.07-.02.16-.03.22z" />
                  </svg>
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}