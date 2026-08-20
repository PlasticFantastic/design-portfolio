// src/app/cases/[slug]/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FullscreenMenu from '@/components/FullscreenMenu';
import { ALL_CASES } from '@/data/cases';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Премиальный бейдж этапа
function StageBadge({ number }: { number: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200/90 shadow-xs text-[11px] font-mono font-bold text-gray-900 shrink-0 self-start sm:self-auto">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" />
      <span>ЭТАП {number}</span>
    </span>
  );
}

// Компонент вывода изображений статьи
function CaseImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeInUp}
      className="my-6 sm:my-10 w-full"
    >
      {/* Мобильная версия */}
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

      {/* Десктопная версия */}
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

export default function CaseDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const currentSlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || '';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Находим текущий кейс в данных
  const caseItem = ALL_CASES.find((c) => c.slug === currentSlug);

  // Подбираем 3 других кейса для блока "Смотрите также"
  const otherCases = useMemo(() => {
    return ALL_CASES.filter((item) => item.slug !== currentSlug).slice(0, 3);
  }, [currentSlug]);

  // Стейт мобильного слайдера в блоке "Смотрите также"
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!otherCases.length) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % otherCases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [otherCases.length]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveSlide((prev) => (prev + 1) % otherCases.length);
    } else if (info.offset.x > swipeThreshold) {
      setActiveSlide((prev) => (prev - 1 + otherCases.length) % otherCases.length);
    }
  };

  // Если кейс не найден в базе
  if (!caseItem && currentSlug) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Кейс не найден</h1>
        <Link
          href="/cases"
          className="px-6 py-3 bg-[#111827] text-white rounded-full text-xs font-bold hover:bg-[#FF4D2D] transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] text-[#111827] pb-16 sm:pb-24">
      {/* ПОЛНОЭКРАННОЕ МЕНЮ */}
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

      {/* ХЕДЕР МЕНЮ */}
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

      {/* ОСНОВНОЙ КОНТЕЙНЕР СТАТЬИ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 lg:pt-24 relative">
        <main>
          {/* HERO СЕКЦИЯ (ДИНАМИЧЕСКАЯ) */}
          <section className="mb-12 sm:mb-16">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <span className="inline-block text-[11px] font-mono font-bold text-[#FF4D2D] uppercase tracking-widest bg-[#FF4D2D]/10 px-3 py-1 rounded-full border border-[#FF4D2D]/20 mb-4">
                {caseItem?.category || 'Design'}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.12] mb-6 text-gray-900">
                {caseItem?.title}
              </h1>
            </motion.div>

            {/* Метаданные */}
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
                <span className="text-xs sm:text-sm font-bold text-[#FF4D2D]">{caseItem?.year || '2024'}</span>
              </div>
            </motion.div>
          </section>

          {/* === УСЛОВНЫЙ РЕНДЕР КОНТЕНТА === */}
          {currentSlug === 'slimmer' ? (
            <>
              {/* О ПРОЕКТЕ (Только для Slimmer) */}
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
                    Когда я присоединился к проекту, приложение представляло собой минимальный MVP: пользователь мог только записывать свой вес и видеть индекс массы тела. Моей задачей стало превратить простой трекер в полноценный цифровой продукт.
                  </div>
                </div>
              </motion.section>

              {/* ОСНОВНЫЕ ЭТАПЫ СТАТЬИ (Только для Slimmer) */}
              <div className="space-y-16 sm:space-y-24 mb-16 sm:mb-24">
                {/* ЭТАП 1 */}
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
                      </ul>
                    </div>

                    <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                      <h3 className="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                        <span>💡</span> Решение
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        Разработал новый Dashboard — центральный экран продукта, объединяющий всю ключевую информацию о прогрессе пользователя.
                      </p>
                    </div>
                  </div>

                  <CaseImage src="sl-1.webp" alt="Dashboard Slimmer" />

                  <div className="space-y-10">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Блок веса и целей</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                        Основным элементом Dashboard стал блок текущего прогресса: текущий вес, стартовый вес, текущий ИМТ, целевой вес и график изменений.
                      </p>
                      <CaseImage src="sl-2.webp" alt="Блок веса и целей" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Дополнительные показатели</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                        Дополнительные карточки: сброшенный вес, остаток до цели, категория ИМТ и замеры тела.
                      </p>
                      <CaseImage src="sl-3.webp" alt="Дополнительные показатели" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Быстрое добавление данных</h3>
                      <CaseImage src="sl-4.webp" alt="Быстрое добавление данных" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Дополнительные разделы</h3>
                      <CaseImage src="sl-5.webp" alt="Дополнительные разделы и история" />
                    </div>
                  </div>
                </motion.section>

                {/* ЭТАП 2 */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                    <StageBadge number="02" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                      Первый запуск и безопасная авторизация
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Авторизация по номеру телефона, вход по коду, Face ID и восстановление доступа. Onboarding с маскотом проекта — котом Бари.
                  </p>
                  <CaseImage src="sl-6.webp" alt="Onboarding и Авторизация" />
                </motion.section>

                {/* ЭТАП 3 */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                    <StageBadge number="03" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                      Формирование полезных привычек
                    </h2>
                  </div>
                  <CaseImage src="sl-7.webp" alt="Трекеры привычек" />
                </motion.section>

                {/* ЭТАП 4 */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                    <StageBadge number="04" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                      Профиль пользователя & Фото-прогресс
                    </h2>
                  </div>
                  <CaseImage src="sl-7-1.webp" alt="Профиль пользователя" />
                  <CaseImage src="sl-8.webp" alt="Сравнение фото-прогресса" />
                </motion.section>

                {/* ЭТАП 5 */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                    <StageBadge number="05" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                      От трекера веса к персональному Health Hub
                    </h2>
                  </div>
                  <CaseImage src="sl-9.webp" alt="Раздел Таблетница" />
                  <CaseImage src="sl-10.webp" alt="Медицинские документы и анализы" />
                  <CaseImage src="sl-11.webp" alt="Образовательный Блог и Сторис" />
                </motion.section>

                {/* ЭТАП 6 */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                    <StageBadge number="06" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                      Темная тема и развитие дизайн-системы
                    </h2>
                  </div>
                  <CaseImage src="sl-12.webp" alt="Темная тема и Токены" />
                </motion.section>

                {/* ЭТАП 7 */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                    <StageBadge number="07" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                      Онлайн-консультации
                    </h2>
                  </div>
                  <CaseImage src="sl-13.webp" alt="Онлайн консультации с врачами" />
                </motion.section>

                {/* ЭТАП 8 */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 mb-3">
                    <StageBadge number="08" />
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-900">
                      Адаптация продукта под Web
                    </h2>
                  </div>
                  <CaseImage src="sl-14.webp" alt="Веб-версия Slimmer" />
                </motion.section>
              </div>

              {/* ПРОЦЕСС И РЕЗУЛЬТАТЫ (Только для Slimmer) */}
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
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                      <li><strong className="text-[#FF4D2D]">1.</strong> Анализ требований и исследование</li>
                      <li><strong className="text-[#FF4D2D]">2.</strong> Сценарии использования (CJM)</li>
                      <li><strong className="text-[#FF4D2D]">3.</strong> Wireframes и UX-прототипы</li>
                      <li><strong className="text-[#FF4D2D]">4.</strong> UI & Развитие Дизайн-системы</li>
                      <li><strong className="text-[#FF4D2D]">5.</strong> Передача макетов в разработку</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#111827] text-white p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#FF4D2D] uppercase tracking-widest block mb-2">
                      Итог реализации
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black mb-4">Результат</h2>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Slimmer трансформировался из простого трекера веса в полноценную HealthTech-платформу, объединяющую контроль ИМТ, замеры, привычки, анализы, лекарства, блог и телемедицину.
                    </p>
                  </div>
                </div>
              </motion.section>
            </>
          ) : (
            /* ЗАГЛУШКА ДЛЯ ВСЕХ ОСТАЛЬНЫХ КЕЙСОВ */
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="py-20 sm:py-32 mb-16 sm:mb-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-gray-200/80 shadow-sm px-4"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-5 border border-gray-200">
                <span className="text-2xl">🚧</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">
                Подробный разбор кейса в процессе оформления
              </h2>
              <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                Прямо сейчас я готовлю описание процесса работы, макеты и результаты для этого проекта. Скоро здесь появится полный контент.
              </p>
            </motion.div>
          )}
          {/* === КОНЕЦ УСЛОВНОГО РЕНДЕРА === */}

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
              {otherCases.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/cases/${item.slug}`}
                    className="group block relative w-full p-1.5 rounded-[22px] overflow-hidden bg-white shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 border border-gray-200/80 hover:border-[#FF4D2D]/40 active:scale-[1.015]"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-950 rounded-[18px] shadow-md shadow-black/10">
                      {item.coverSrc ? (
                        <Image
                          src={item.coverSrc}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-tr ${item.accentGradient} opacity-80 group-hover:opacity-100 transition-all duration-700`} />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                        <span className="text-[10px] font-mono font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                          {item.year}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between gap-2">
                        <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        <div className="w-7 h-7 rounded-full bg-[#FF4D2D] text-white flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* МОБИЛЬНЫЙ СЛАЙДЕР */}
            {otherCases.length > 0 && (
              <div className="block sm:hidden relative touch-pan-y">
                <div className="overflow-hidden rounded-[22px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Link
                        href={`/cases/${otherCases[activeSlide].slug}`}
                        className="group block relative w-full p-1.5 rounded-[22px] overflow-hidden bg-white shadow-sm border border-gray-200/80 active:scale-[0.98] transition-transform"
                      >
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-950 rounded-[18px] shadow-md shadow-black/10">
                          {otherCases[activeSlide].coverSrc ? (
                            <Image
                              src={otherCases[activeSlide].coverSrc}
                              alt={otherCases[activeSlide].title}
                              fill
                              sizes="100vw"
                              className="object-cover object-top"
                            />
                          ) : (
                            <div className={`absolute inset-0 bg-gradient-to-tr ${otherCases[activeSlide].accentGradient} opacity-90`} />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                          <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                            <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                              {otherCases[activeSlide].category}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                              {otherCases[activeSlide].year}
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between gap-2">
                            <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">
                              {otherCases[activeSlide].title}
                            </h3>
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg border border-white/10 shrink-0">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
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
                      aria-label={`Слайд ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ФУТЕР */}
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
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="mailto:contact@designer.com"
                  className="px-6 py-3.5 rounded-full bg-[#FF4D2D] hover:bg-white text-white hover:text-[#111827] font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg"
                >
                  Написать на почту
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}