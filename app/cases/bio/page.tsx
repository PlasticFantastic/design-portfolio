'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FullscreenMenu from '@/components/FullscreenMenu';
import { ALL_CASES } from '@/data/cases';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const canvasImages = [
  'bio1.webp', 'bio2.webp', 'bio3.webp', 'bio4.webp', 'bio5.webp', 
  'bio6.webp', 'bio7.webp', 'bio8.webp', 'bio9.webp', 'bio10.webp', 
  'bio11.webp', 'bio12.webp'
];

export default function BioCasePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Логика для блока "Смотрите также"
  const otherCases = ALL_CASES.slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % otherCases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [otherCases.length]);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveSlide((prev) => (prev + 1) % otherCases.length);
    } else if (info.offset.x > swipeThreshold) {
      setActiveSlide((prev) => (prev - 1 + otherCases.length) % otherCases.length);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F6F9] text-[#111827] flex flex-col relative selection:bg-[#FF4D2D] selection:text-white">
      
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

      {/* ВЕРХНИЙ БЛОК: Заголовок слева, обложка справа */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Левая часть: Заголовок */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="flex flex-col items-start"
          >
            <span className="inline-block mb-4 sm:mb-6 text-[10px] sm:text-xs font-mono font-bold text-[#FF4D2D] uppercase tracking-widest bg-[#FF4D2D]/10 px-3.5 py-1.5 rounded-full border border-[#FF4D2D]/20">
              Case Study
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 leading-[1.05]">
              Biotime — дизайн интернет-магазина косметики
            </h1>
          </motion.div>

          {/* Правая часть: Обложка */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="w-full"
          >
            <div className="w-full rounded-[20px] sm:rounded-[28px] overflow-hidden border border-gray-200/80 shadow-2xl shadow-black/10 bg-white">
              <Image 
                src="/cases/biotime/cover-a.webp" 
                alt="Cover" 
                width={1200} 
                height={800} 
                className="w-full h-auto object-cover" 
                priority
              />
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* БЕСШОВНОЕ ПОЛОТНО */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1440px] mx-auto flex flex-col shadow-2xl shadow-black/5 rounded-[24px] sm:rounded-[40px] overflow-hidden bg-white"
      >
        {canvasImages.map((img, idx) => (
          <Image
            key={idx}
            src={`/cases/biotime/${img}`}
            alt={`Canvas section ${idx + 1}`}
            width={1440}
            height={900} 
            className={`w-full h-auto block m-0 p-0 relative z-10 ${idx !== 0 ? '-mt-[1px]' : ''}`}
            quality={90}
          />
        ))}
      </motion.div>

      {/* НИЖНИЙ БЛОК: Последние два блока в стандартной сетке */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-24 pb-16 sm:pb-24">
        
        {/* БЛОК "СМОТРИТЕ ТАКЖЕ" */}
        <section className="mb-16 sm:mb-24">
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
                  className="group block relative w-full p-1 sm:p-1.5 rounded-[22px] overflow-hidden bg-white shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 border border-gray-200/80 hover:border-[#FF4D2D]/40 active:scale-[1.015]"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-950 rounded-[18px] shadow-md shadow-black/10">
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${(item as any).gradient} opacity-80 group-hover:opacity-100 transition-all duration-700`}
                    />
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-white font-black text-xl">
                      ✦
                    </div>

                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                      <span className="text-[10px] font-mono font-bold text-white/90 group-hover:text-[#FF4D2D] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 transition-colors duration-300">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-white/80 group-hover:text-[#FF4D2D] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 transition-colors duration-300">
                        2024
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-30 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none">
                      <div className="w-9 h-9 rounded-full bg-[#FF4D2D] text-white flex items-center justify-center shadow-lg shadow-[#FF4D2D]/30 leading-none">
                        <svg
                          className="w-4 h-4 shrink-0 block"
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
            ))}
          </div>

          {/* МОБИЛЬНЫЙ СЛАЙДЕР */}
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
                    className="group block relative w-full p-1 rounded-[22px] overflow-hidden bg-white shadow-sm border border-gray-200/80 active:scale-[0.98] transition-transform"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-950 rounded-[18px] shadow-md shadow-black/10">
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${(otherCases[activeSlide] as any).gradient} opacity-90`}
                      />
                      <div className="relative z-10 w-full h-full flex items-center justify-center text-white font-black text-xl">
                        ✦
                      </div>

                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
                        <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                          {otherCases[activeSlide].category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                          2024
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3 z-30">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg border border-white/10 leading-none">
                          <svg
                            className="w-4 h-4 shrink-0 block"
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
                href="mailto:greensprites@gmail.com"
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
                href="https://t.me/goldsprites"
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
      </div>
    </div>
  );
}