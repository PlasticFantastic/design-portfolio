'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Oswald } from 'next/font/google';
import FullscreenMenu from '@/components/FullscreenMenu';
import { ALL_CASES } from '@/data/cases';

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

// КОМПОНЕНТ ЖИВОГО ВЕКТОРНОГО ОГНЯ
function AnimatedFlame() {
  return (
    <div className="relative flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
      <motion.div
        animate={{
          scale: [0.8, 1.25, 0.9, 1.3, 0.8],
          opacity: [0.4, 0.8, 0.5, 0.9, 0.4],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-[#FF4D2D] blur-sm"
      />
      <motion.span
        animate={{
          y: [-2, -10],
          x: [0, -3, 2],
          opacity: [1, 0],
          scale: [1, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'easeOut' }}
        className="absolute -top-0.5 left-1/2 w-0.5 h-0.5 bg-yellow-300 rounded-full pointer-events-none"
      />
      <motion.span
        animate={{
          y: [-1, -8],
          x: [0, 3, -1],
          opacity: [1, 0],
          scale: [0.8, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 0.85, delay: 0.35, ease: 'easeOut' }}
        className="absolute -top-0.5 left-1/3 w-0.5 h-0.5 bg-orange-400 rounded-full pointer-events-none"
      />
      <motion.svg
        animate={{
          scaleY: [1, 1.12, 0.94, 1.08, 1],
          scaleX: [1, 0.92, 1.06, 0.95, 1],
          rotate: [-1.5, 2, -2, 1.5, -1.5],
        }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 origin-bottom"
        viewBox="0 0 24 24"
        fill="none"
      >
        <defs>
          <linearGradient id="flameOuter" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF1E00" />
            <stop offset="55%" stopColor="#FF4D2D" />
            <stop offset="100%" stopColor="#FFB800" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FFF500" />
          </linearGradient>
        </defs>
        <path
          d="M12 23C16.4183 23 20 19.4183 20 15C20 10.5 16 7.5 14 3.5C13.5 6 12 7.5 10 7.5C8 7.5 6.5 5.5 6 4C4 7 4 10.5 4 15C4 19.4183 7.58172 23 12 23Z"
          fill="url(#flameOuter)"
        />
        <motion.path
          animate={{
            scaleY: [1, 1.18, 0.88, 1.1, 1],
            opacity: [0.85, 1, 0.7, 1, 0.85],
          }}
          transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
          d="M12 21C14.2091 21 16 19.2091 16 17C16 14.5 14 13 13 10.5C12.5 12 11.5 12.5 10.5 12.5C9.5 12.5 8.5 11.5 8 10.5C7 12 7 14.5 7 17C7 19.2091 8.79086 21 12 21Z"
          fill="url(#flameInner)"
          className="origin-bottom"
        />
      </motion.svg>
    </div>
  );
}

export default function CasesCatalogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const titleText = "ИЗБРАННЫЕ ПРОЕКТЫ";

  return (
    <div className="min-h-screen w-full bg-[#F5F6F9] text-[#111827] px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-20 flex flex-col justify-between relative">
      
      {/* ПОЛНОЭКРАННОЕ МЕНЮ */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ФИКСИРОВАННАЯ КНОПКА «НАЗАД» (перенесена из Slimmer) */}
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
        <span className="hidden sm:inline">На главную</span>
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

      <div className="pt-8 sm:pt-12">
        {/* Шапка каталога */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200/80">
          <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
            Portfolio / Selected Works
          </span>
          <span className="text-xs font-mono font-bold text-[#FF4D2D] tracking-widest bg-[#FF4D2D]/10 px-3.5 py-1 rounded-full border border-[#FF4D2D]/20">
            {ALL_CASES.length} PROJECTS
          </span>
        </div>

{/* АНИМИРОВАННЫЙ БЛОК ЗАГОЛОВКА С ШРИФТОМ OSWALD */}
<div className="mb-12 sm:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
  
  {/* Левая колонка: Крупный заголовок */}
  <div className="lg:col-span-7 xl:col-span-7">
    <motion.h1 
      className={`${oswald.className} text-4xl sm:text-6xl lg:text-7xl xl:text-[84px] font-bold uppercase tracking-tight text-[#111827] leading-[0.92]`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04 } }
      }}
    >
      {titleText.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  </div>

  {/* Правая колонка: Чистый редакторский текст */}
  <div className="lg:col-span-5 xl:col-span-5">
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: titleText.length * 0.04 + 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      className="text-gray-500 text-sm sm:text-base leading-relaxed space-y-3"
    >
      <p>
        Не все проекты попадают в портфолио. Здесь собраны <strong className="font-semibold text-gray-900">9 работ</strong>, в которых я самостоятельно отвечал за дизайн — от исследования и проектирования пользовательских сценариев до интерфейсов и их реализации.
      </p>
      <p>
        За последние несколько лет я успел поработать более чем над <strong className="font-semibold text-gray-900">50 проектами</strong> для разных продуктов, компаний и заказчиков.
      </p>
    </motion.div>
  </div>

</div>

        {/* СЕТКА КЕЙСОВ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {ALL_CASES.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx * 0.08) + 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={`/cases/${item.slug}`}
                  className="group block relative w-full p-2.5 sm:p-3 rounded-[32px] sm:rounded-[36px] bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-gray-300 active:scale-[1.015]"
                >
                  {/* ИЗОБРАЖЕНИЕ КАРТОЧКИ */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-gray-100 rounded-[22px] sm:rounded-[26px]">
                    {item.coverSrc ? (
                      <Image
                        src={item.coverSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                        priority={idx === 0}
                      />
                    ) : (
                      <div className="w-full h-full relative flex items-center justify-center bg-gray-900">
                        <div
                          className={`absolute inset-0 bg-gradient-to-tr ${item.accentGradient} opacity-70 group-hover:opacity-100 group-active:opacity-100 transition-all duration-700`}
                        />
                        <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 text-white font-black text-xl sm:text-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20">
                          ✦
                        </div>
                      </div>
                    )}

                    {/* ВЕРХНИЕ БЕЙДЖИ */}
<div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 flex justify-between items-center z-20 pointer-events-none">
  <div className="flex items-center gap-1.5 sm:gap-2">
    {/* Отображаем Top Case для первых двух проектов */}
    {idx < 2 && (
      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-[#FF4D2D] bg-black/50 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 shadow-sm">
        <AnimatedFlame />
        <span className="uppercase tracking-wider text-white">Top Case</span>
      </span>
    )}

    <span className="text-[10px] sm:text-xs font-mono font-bold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 shadow-sm">
      {item.category}
    </span>
  </div>

  <span className="text-[10px] sm:text-xs font-mono font-bold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 shadow-sm">
    {item.year}
  </span>
</div>

                    {/* DESKTOP: ГРАДИЕНТНЫЙ ОВЕРЛЕЙ ПРИ HOVER */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* DESKTOP: ТЕМНАЯ СТЕКЛЯННАЯ ПЛАШКА В СТИЛЕ DARK GLASS */}
                    <div className="hidden md:flex absolute left-5 right-5 bottom-5 z-30 p-6 lg:p-7 rounded-[24px] bg-[#111827]/85 backdrop-blur-md border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35)] items-center justify-between gap-6 transition-all duration-500 ease-out translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="space-y-1.5 max-w-[80%]">
                        <h2 className={`${oswald.className} text-2xl lg:text-3xl font-bold text-white leading-snug uppercase tracking-tight line-clamp-1`}>
                          {item.title}
                        </h2>
                        <p className="text-sm lg:text-base text-gray-300 leading-relaxed font-normal line-clamp-2">
                          {item.shortDescription}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 shadow-xl group-hover:bg-[#FF4D2D] group-hover:text-white group-hover:rotate-[360deg] group-hover:scale-105 group-hover:border-transparent">
                          <svg
                            className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110"
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
                  </div>

                  {/* MOBILE: ЧЕРНАЯ ПЛАШКА СТРОГО ПОД ИЗОБРАЖЕНИЕМ */}
                  <div className="flex md:hidden mt-2 p-3.5 bg-[#111827] text-white rounded-[18px] items-center justify-between gap-3">
                    <div className="min-w-0 pr-2">
                      <h2 className="text-sm font-bold text-white leading-snug tracking-tight truncate">
                        {item.title}
                      </h2>
                    </div>

                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5"
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
      </div>
    </div>
  );
}

      {/* ФУТЕР */}
      <footer className="relative z-40 w-full px-6 md:px-12 lg:px-16 py-4 border-t border-gray-200/60 bg-white/40 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-mono text-gray-400">
        <div>© 2026 VISHNEV.ART — ALL RIGHTS RESERVED</div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline">UTC+3</span>
          <span className="hidden md:inline">•</span>
          <Link href="/contact" className="hover:text-[#111827] transition-colors uppercase">
            Get in touch ↗
          </Link>
        </div>
      </footer>