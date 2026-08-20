// src/app/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Oswald } from 'next/font/google';

import HeroGlowCanvas from '@/components/HeroGlowCanvas';
import FullscreenMenu from '@/components/FullscreenMenu';

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

// Список сменяющихся слов для слайдера
const SLIDING_WORDS = [
  'крутое',
  'полезное',
  'удобное',
  'понятное',
  'продуманное',
  'эффективное',
  'востребованное',
  'работающее',
  'масштабируемое',
  'функциональное',
];

// Улучшенная плавная анимация появления
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.14,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Переключение слов каждые 2.2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % SLIDING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const contactLinks = [
    {
      id: 'telegram',
      label: 'Telegram',
      value: '@goldsprites',
      href: 'https://t.me/goldsprites',
      primary: true,
      tag: '// FAST RESPONSE',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.331.016.115.035.371.019.571z" />
        </svg>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      value: 'greensprites@gmail.com',
      href: 'mailto:greensprites@gmail.com',
      primary: false,
      tag: '// MAIL',
      icon: (
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'Nikolay Vishnev',
      href: 'https://www.linkedin.com/in/nikolay-vishnev-76b46520a/',
      primary: false,
      tag: '// NETWORK',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      id: 'cv',
      label: 'Резюме',
      value: 'Скачать CV (PDF)',
      href: '/cv-vishnev-designer.pdf',
      download: true,
      primary: false,
      tag: '// DOCUMENT',
      icon: (
        <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
    },
  ];

  return (
    <main className="relative w-full min-h-dvh lg:h-dvh bg-[#111827] text-white flex flex-col justify-between overflow-x-hidden overflow-y-auto lg:overflow-hidden font-sans select-none antialiased">
      
      {/* Полноэкранное меню */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Фоновый интерактивный glow-канвас */}
      <HeroGlowCanvas />

      {/* Размытые световые акценты */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF4D2D]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#FF4D2D]/10 rounded-full blur-[120px] pointer-events-none" />

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

      {/* ХЕДЕР C КНОПКОЙ МЕНЮ */}
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

      {/* ЦЕНТРАЛЬНЫЙ БЛОК */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 lg:pt-20 pb-8 flex-1 flex flex-col justify-center">
        
        {/* Интро тег */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D] animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-gray-300 tracking-widest uppercase">
              // CONTACTS & CONNECT
            </span>
          </div>
        </motion.div>

        {/* Заголовок с увеличенным интервалом и слайдером слов */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeInUp}
          className="mb-8 lg:mb-12"
        >
          <h1 className={`${oswald.className} text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[1.18] sm:leading-[1.2]`}>
            ДАВАЙТЕ СОЗДАДИМ <br />
            <span className="inline-flex flex-wrap items-center gap-x-3">
              <span>ЧТО-ТО</span>
              <span className="inline-flex relative overflow-hidden h-[1.25em] items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={SLIDING_WORDS[wordIndex]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#FF4D2D] whitespace-nowrap block"
                  >
                    {SLIDING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>
        </motion.div>

        {/* СЕТКА С КАРТОЧКАМИ КОНТАКТОВ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactLinks.map((contact, index) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={contact.download ? '_self' : '_blank'}
              rel="noopener noreferrer"
              download={contact.download ? true : undefined}
              initial="hidden"
              animate="visible"
              custom={index + 2}
              variants={fadeInUp}
              className={`group relative p-6 sm:p-8 rounded-3xl backdrop-blur-md border transition-all duration-500 flex flex-col justify-between h-[220px] sm:h-[260px] overflow-hidden ${
                contact.primary
                  ? 'bg-[#FF4D2D] border-[#FF4D2D] text-white shadow-xl shadow-[#FF4D2D]/20 hover:scale-[1.02]'
                  : 'bg-white/[0.03] border-white/10 hover:border-[#FF4D2D]/60 hover:bg-white/[0.06] hover:scale-[1.02]'
              }`}
            >
              {/* Фактурная сетка фоном */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Стрелка перехода в углу */}
              <div className="absolute top-6 right-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg
                  className={`w-5 h-5 ${contact.primary ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              {/* Верхняя часть: Иконка и тег */}
              <div className="space-y-4 z-10">
                <div className={`p-3 rounded-2xl inline-block ${contact.primary ? 'bg-black/20 text-white' : 'bg-white/10 text-[#FF4D2D]'}`}>
                  {contact.icon}
                </div>
                <div className={`font-mono text-[10px] tracking-widest uppercase font-bold ${contact.primary ? 'text-white/80' : 'text-gray-400'}`}>
                  {contact.tag}
                </div>
              </div>

              {/* Нижняя часть: Лейбл и значение */}
              <div className="z-10 space-y-1">
                <div className={`text-xs font-mono font-semibold uppercase tracking-wider ${contact.primary ? 'text-white/90' : 'text-gray-400'}`}>
                  {contact.label}
                </div>
                <div className={`${oswald.className} text-xl sm:text-2xl font-bold uppercase tracking-tight truncate ${contact.primary ? 'text-white' : 'text-white group-hover:text-[#FF4D2D] transition-colors'}`}>
                  {contact.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>

      {/* ФУТЕР */}
      <motion.footer 
        initial="hidden"
        animate="visible"
        custom={6}
        variants={fadeInUp}
        className="relative z-10 w-full px-6 md:px-12 py-5 border-t border-white/10 bg-[#111827]/80 backdrop-blur-md text-[11px] font-mono text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2"
      >
        <div>© 2026 NIKOLAY VISHNEV — ALL RIGHTS RESERVED</div>

        <div className="flex items-center gap-6">
          <span className="hidden md:inline">UTC+3 (MOSCOW)</span>
          <span className="hidden md:inline">•</span>
          <span className="text-gray-300 uppercase">AVAILABLE FOR NEW PROJECTS</span>
        </div>
      </motion.footer>

    </main>
  );
}