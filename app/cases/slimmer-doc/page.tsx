'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FullscreenMenu from '@/components/FullscreenMenu';
import { MicroConfetti } from '@/components/MicroConfetti';
import { ALL_CASES } from '@/data/cases';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function SlimmerDoctorCasePage() {
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

  // Логика для блока "Смотрите также" (перенесена из Slimmer)
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
    <div className="min-h-screen w-full bg-[#F5F6F9] text-[#111827] flex flex-col relative selection:bg-[#FF4D2D] selection:text-white">
      
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="pointer-events-auto flex flex-col items-center"
            >
              <button
                onClick={() => setIsMenuOpen(true)}
                className="group relative flex items-center justify-center gap-3 px-10 sm:px-14 pt-3 pb-3.5 bg-[#111827] text-white text-xs font-mono font-semibold uppercase tracking-widest rounded-b-2xl shadow-2xl shadow-black/15 border-b border-x border-white/10 hover:bg-[#FF4D2D] transition-all duration-300 hover:pt-4 hover:pb-4 cursor-pointer min-w-[200px]"
              >
                <svg className="absolute -left-4 -top-px w-4 h-4 text-[#111827] group-hover:text-[#FF4D2D] transition-colors fill-current pointer-events-none -scale-x-100" viewBox="0 0 16 16">
                  <path d="M 16 0 A 16 16 0 0 0 0 16 L 0 0 Z" />
                </svg>
                <svg className="absolute -right-4 -top-px w-4 h-4 text-[#111827] group-hover:text-[#FF4D2D] transition-colors fill-current pointer-events-none" viewBox="0 0 16 16">
                  <path d="M 16 0 A 16 16 0 0 0 0 16 L 0 0 Z" />
                </svg>
                <span className="w-2 h-2 rounded-full bg-[#FF4D2D] group-hover:bg-white transition-colors animate-pulse" />
                <span>Меню</span>
                <span className="text-gray-400 group-hover:text-white transition-colors group-hover:translate-y-0.5 text-xs ml-0.5">↓</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-16 sm:pb-24">
        
        {/* HERO СЕКЦИЯ */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-16">
          <span className="inline-block mb-4 text-xs font-mono font-bold text-[#FF4D2D] uppercase tracking-widest bg-[#FF4D2D]/10 px-3.5 py-1 rounded-full border border-[#FF4D2D]/20">
            Case Study
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 text-gray-900 leading-none">
            Slimmer Doctor
          </h1>
          <p className="text-xl sm:text-3xl text-gray-500 font-medium leading-snug max-w-3xl">
            Медицинская SaaS-платформа для управления пациентами и консультациями
          </p>
        </motion.div>

        {/* МЕТАДАННЫЕ ПРОЕКТА */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 border-y border-gray-200/80 py-8 mb-20"
        >
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">Роль</div>
            <div className="text-sm font-semibold text-gray-900">Product Designer</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">Команда</div>
            <div className="text-sm font-medium text-gray-700 leading-relaxed">Product Manager, системный аналитик, разработчики, мед. специалисты</div>
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">Платформа</div>
            <div className="text-sm font-semibold text-gray-900">Web</div>
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">Тип продукта</div>
            <div className="text-sm font-semibold text-gray-900">B2B SaaS / Healthcare CRM</div>
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">Срок</div>
            <div className="text-sm font-semibold text-gray-900">2024 — н.в.</div>
          </div>
        </motion.div>

        {/* ОСНОВНОЙ КОНТЕНТ */}
        <div className="space-y-24 mb-16 sm:mb-24">
          
          {/* 1. О проекте */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">О проекте</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                <strong>Slimmer Doctor</strong> — веб-платформа для врачей и медицинских специалистов, которая объединяет работу с пациентами, расписанием, консультациями и медицинской документацией.
              </p>
              <p>
                Система была создана для цифровизации процессов клиники, которая специализируется на снижении веса и бариатрическом лечении, но архитектура продукта изначально проектировалась с возможностью масштабирования под другие клиники и медицинские направления.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                <div className="bg-white p-6 rounded-[22px] border border-gray-200/80 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Пациент:</h3>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> отслеживает показатели здоровья;</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> получает консультации;</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> хранит медицинские документы;</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> взаимодействует с врачом.</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-[22px] border border-gray-200/80 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Врач и клиника:</h3>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> управляют пациентами;</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> проводят консультации;</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> анализируют данные;</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF4D2D] mt-1">✦</span> ведут документацию.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 2. Проблема */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Проблема</h2>
            <div className="prose prose-lg text-gray-600 max-w-3xl mb-10">
              <p>До создания системы процессы были распределены между разными инструментами:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#FF4D2D]">
                <li>данные пациентов хранились в разных местах;</li>
                <li>расписание врачей велось отдельно;</li>
                <li>консультации проходили через сторонние сервисы;</li>
                <li>история изменений пациента не была собрана в одном месте;</li>
                <li>врачу было сложно получить полную картину состояния пациента.</li>
              </ul>
              <p className="font-medium text-gray-900 mt-6">
                Необходимо было создать единую систему, которая позволит управлять всем путем пациента внутри одной платформы.
              </p>
            </div>
            
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-1.webp" alt="Проблема и интерфейс" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 3. Ролевая система */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Проектирование сложной ролевой системы</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl">Одной из первых задач стала проработка структуры пользователей и уровней доступа. В системе предусмотрено несколько ролей:</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { title: "Врач", desc: "Основная работа с пациентами: просмотр карточек; проведение консультаций; изменение статусов; создание документов." },
                { title: "Главный врач", desc: "Дополнительно: контроль работы специалистов; просмотр пациентов; управление процессами." },
                { title: "Администратор", desc: "Отвечает за: создание пользователей; настройку расписаний; управление слотами; распределение пациентов." },
                { title: "Бухгалтер", desc: "Работа с финансовыми процессами." },
                { title: "Техническая поддержка", desc: "Контроль работы системы и помощь пользователям." }
              ].map((role, i) => (
                <div key={i} className="bg-white p-6 rounded-[22px] border border-gray-200/80 shadow-sm hover:border-[#FF4D2D]/40 transition-colors">
                  <h3 className="text-lg font-black text-[#111827] mb-3">{role.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{role.desc}</p>
                </div>
              ))}
            </div>
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-2.webp" alt="Ролевая система" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 4. Архитектура продукта */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Архитектура продукта</h2>
            <div className="prose prose-lg text-gray-600 max-w-3xl mb-10">
              <p>Перед созданием интерфейсов я прорабатывал:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#FF4D2D]">
                <li>пользовательские сценарии;</li>
                <li>структуру разделов;</li>
                <li>взаимосвязи данных;</li>
                <li>права доступа.</li>
              </ul>
              <p className="font-medium text-gray-900 mt-4">Основной задачей было сделать сложную медицинскую систему понятной для разных ролей.</p>
            </div>
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-3.webp" alt="Архитектура" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 5. Рабочее место врача */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Рабочее место врача</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl">Главным экраном врача стал календарь расписания. Врач может:</p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#FF4D2D] text-gray-600 text-lg mb-10">
              <li>видеть свои приемы;</li>
              <li>переключаться между днем, неделей и месяцем;</li>
              <li>открывать карточку пациента;</li>
              <li>подключиться к консультации.</li>
            </ul>
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-4.webp" alt="Рабочее место" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 6. Карточка пациента */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Карточка пациента — единое мед. пространство</h2>
            <div className="prose prose-lg text-gray-600 max-w-3xl mb-10">
              <p>Одним из ключевых сценариев была разработка карточки пациента. В одном месте врач получает доступ к:</p>
              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                {["Персональная информация", "История веса", "ИМТ", "Активность", "Водный баланс", "Настроение", "Замеры тела", "Анализы", "Лекарства", "Документы"].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm">{tag}</span>
                ))}
              </div>
              <p className="font-bold text-gray-900 border-l-4 border-[#FF4D2D] pl-4 py-1">
                Главная задача: перед консультацией врач должен быстро получить полную картину состояния пациента без переключения между системами.
              </p>
            </div>
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-5.webp" alt="Карточка пациента" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 7. Онлайн-консультации */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Онлайн-консультации внутри платформы</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl">Одной из ключевых функций стала возможность проводить консультации непосредственно внутри системы.</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xl font-bold mb-4">Разработанные сценарии:</h3>
                <ul className="space-y-4">
                  <li className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"><strong>Чат</strong> — Для текстового общения.</li>
                  <li className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"><strong>Аудиозвонок</strong> — Для голосовой консультации.</li>
                  <li className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"><strong>Видеозвонок</strong> — Для полноценного приема онлайн.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Во время приема врач может:</h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#FF4D2D] text-gray-600">
                  <li>открыть пациента;</li>
                  <li>изучить историю;</li>
                  <li>начать консультацию;</li>
                  <li>добавить информацию;</li>
                  <li>сформировать итоговые документы.</li>
                </ul>
              </div>
            </div>
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-6.webp" alt="Онлайн-консультации" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 8. Расписание */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black mb-6">Управление расписанием и слотами</h2>
                <p className="text-lg text-gray-600 mb-6">Для организации приемов была разработана система расписания. Администратор может:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#FF4D2D] text-gray-600 text-lg mb-6">
                  <li>создавать свободные слоты;</li>
                  <li>назначать их врачам;</li>
                  <li>управлять доступностью специалистов.</li>
                </ul>
                <p className="text-sm font-medium text-gray-500 bg-gray-100 p-4 rounded-xl">Эти данные автоматически отображаются пользователям в приложении Slimmer.</p>
              </div>
              <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
                <Image src="/cases/slimmer-doc/dd-7.webp" alt="Расписание" width={800} height={600} className="w-full h-auto object-cover" />
              </div>
            </div>
          </motion.section>

          {/* 9. Документация */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
                <Image src="/cases/slimmer-doc/dd-8.webp" alt="Документация" width={800} height={600} className="w-full h-auto object-cover" />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl sm:text-4xl font-black mb-6">Медицинская документация</h2>
                <p className="text-lg text-gray-600 mb-6">В процессе работы появилась необходимость автоматизировать создание документов. Были разработаны сценарии:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#FF4D2D] text-gray-600 text-lg">
                  <li>создание эпикризов;</li>
                  <li>формирование протоколов;</li>
                  <li>хранение медицинской информации;</li>
                  <li>отправка документов пациенту.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* 10. Интеграция */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Интеграция с приложением пациента</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl">Главная особенность продукта — двусторонний обмен данными.</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-[#111827] text-white p-8 rounded-[22px]">
                <h3 className="text-xl font-bold mb-4 text-[#FF4D2D]">Информация доступная врачу:</h3>
                <ul className="space-y-2">
                  <li>✓ изменения веса;</li>
                  <li>✓ активность;</li>
                  <li>✓ замеры тела;</li>
                  <li>✓ прием лекарств;</li>
                  <li>✓ анализы.</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200/80 p-8 rounded-[22px] shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Врач, в свою очередь, может:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ проводить консультации;</li>
                  <li>✓ назначать рекомендации;</li>
                  <li>✓ отправлять документы.</li>
                </ul>
              </div>
            </div>
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-9.webp" alt="Интеграция" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 11. SaaS */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Развитие платформы: переход к SaaS-модели</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl">После создания системы для собственной клиники следующим этапом стало развитие продукта как платформы для других медицинских организаций. В работе появились новые разделы:</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-[22px] border border-gray-200/80">
                <h3 className="font-bold text-lg mb-3">Управление компаниями</h3>
                <p className="text-sm text-gray-500 mb-2">Администратор может:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>создавать организации;</li>
                  <li>подключать клиники;</li>
                  <li>управлять доступами.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-[22px] border border-gray-200/80">
                <h3 className="font-bold text-lg mb-3">Промокоды</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>создание кодов;</li>
                  <li>настройка условий;</li>
                  <li>отслеживание использования.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-[22px] border border-gray-200/80">
                <h3 className="font-bold text-lg mb-3">Финансовая аналитика</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>статистика;</li>
                  <li>расчеты;</li>
                  <li>контроль выплат.</li>
                </ul>
              </div>
            </div>
            <div className="w-full rounded-[22px] overflow-hidden border border-gray-200/80 shadow-xl shadow-black/5">
              <Image src="/cases/slimmer-doc/dd-10.webp" alt="SaaS" width={1200} height={800} className="w-full h-auto object-cover" />
            </div>
          </motion.section>

          {/* 12. Процесс, Результат, Вклад */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="pt-10 border-t border-gray-200/80">
            <div className="grid md:grid-cols-2 gap-16">
              
              {/* Процесс */}
              <div>
                <h2 className="text-3xl font-black mb-6">Процесс работы</h2>
                <p className="text-gray-600 mb-6">Как единственный дизайнер продукта я отвечал за полный цикл создания интерфейсов:</p>
                <div className="space-y-6">
                  {[
                    { title: "Анализ задачи", desc: "изучение требований, анализ конкурентов, изучение медицинских сценариев." },
                    { title: "UX-проектирование", desc: "пользовательские потоки, прототипы, структура экранов." },
                    { title: "UI-дизайн", desc: "создание интерфейсов, адаптация под разные разрешения, поддержка единого визуального языка." },
                    { title: "Работа с разработкой", desc: "обсуждение решений, подготовка макетов, проверка реализации." },
                    { title: "Дизайн-ревью", desc: "после разработки проверял соответствие продукта макетам и корректность UX-сценариев." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-[#FF4D2D] font-black font-mono text-xl">{i + 1}.</div>
                      <div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Результат и Вклад */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-black mb-6">Результат</h2>
                  <p className="text-gray-600 mb-4">В результате была создана полноценная медицинская B2B-платформа:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 font-medium mb-6">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" /> управление пациентами</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" /> расписание врачей</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" /> онлайн-консультации</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" /> мед. документация</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" /> работа с несколькими ролями</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" /> интеграция с приложением</li>
                  </ul>
                  <p className="text-sm text-gray-600 bg-gray-100 p-4 rounded-xl border border-gray-200">
                    Продукт прошел путь от внутренней системы одной клиники до основы SaaS-платформы, которую можно масштабировать для других медицинских организаций.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-black mb-6">Мой вклад</h2>
                  <p className="text-gray-600 mb-4">Я был единственным дизайнером проекта и отвечал за весь продуктовый дизайн:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Исследование и поиск решений", "UX-архитектура", "Прототипирование", "UI", "Адаптация под разные роли", "Взаимодействие с разработчиками", "Дизайн-ревью"].map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-mono tracking-wide">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.section>
        </div>

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
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
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
                          className={`absolute inset-0 bg-gradient-to-tr ${(item as any).gradient || 'from-gray-900 to-gray-800'} opacity-90`}
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
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
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
                            className={`absolute inset-0 bg-gradient-to-tr ${(currentMobileCase as any).gradient || 'from-gray-900 to-gray-800'} opacity-90`}
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

            {/* Кнопки контактов */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="mailto:contact@designer.com"
                className="px-6 py-3.5 rounded-full bg-[#FF4D2D] hover:bg-white text-white hover:text-[#111827] font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#FF4D2D]/20 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.05-.75 4.12-1.8 6.87-2.98 8.25-3.55 3.93-1.63 4.74-1.92 5.27-1.92.12 0 .38.03.55.17.14.12.18.28.2.42-.02.07-.02.16-.03.22z"/>
                </svg>
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}