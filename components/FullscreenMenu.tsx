// src/components/FullscreenMenu.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Навигационные ссылки
const navLinks = [
  { href: '/', label: 'Главная', number: '01' },
  { href: '/cases', label: 'Проекты', number: '02' },
  { href: '/about', label: 'Обо мне', number: '03' },
  { href: '/contact', label: 'Контакты', number: '04' },
];

// Соцсети и контакты
const socialLinks = [
  {
    name: 'Telegram',
    handle: '@goldsprites',
    url: 'https://t.me/goldsprites',
    isLocked: false,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.25.38-.51 1.07-.78 4.18-1.82 6.98-3.02 8.39-3.61 4-.1.67 4.83.17 4.83.67z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Nikolay Vishnev',
    url: 'https://www.linkedin.com/in/nikolay-vishnev-76b46520a/',
    isLocked: false,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    handle: 'Заблокировано',
    url: '#',
    isLocked: true,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Dribbble',
    handle: 'Заблокировано',
    url: '#',
    isLocked: true,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm6.93 6.88a8.38 8.38 0 0 1 1.51 4.71 10.91 10.91 0 0 0-4.13-.81c-.24 0-.48.01-.72.03a19.18 19.18 0 0 0 3.34-3.93zm-3.35-2.58a17.2 17.2 0 0 0-2.82 3.51 17.06 17.06 0 0 0-5.87-2.61 8.35 8.35 0 0 1 8.69-.9zm-10.42.92a18.8 18.8 0 0 1 5.92 2.56 12.3 12.3 0 0 1-3.23 6.32 8.4 8.4 0 0 1-2.69-8.88zm1.09 10.3a10.6 10.6 0 0 0 3.12-6.14 15.3 15.3 0 0 1 5.64 2.8 17.1 17.1 0 0 1-2.38 5.16 8.38 8.38 0 0 1-6.38-1.82zm8.12 2.81a15.42 15.42 0 0 0 2.3-4.94c.32.03.63.05.95.05 1.09 0 2.14-.18 3.12-.52a8.4 8.4 0 0 1-6.37 5.41z" />
      </svg>
    ),
  },
];

const overlayVariants = {
  hidden: {
    opacity: 0,
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
  },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('greensprites@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] bg-[#0B0F17] text-white flex flex-col justify-between overflow-y-auto selection:bg-[#FF4D2D] selection:text-white"
        >
          {/* ФОНОВЫЕ СВЕЧЕНИЯ */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FF4D2D]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

          {/* КНОПКА ЗАКРЫТИЯ */}
          <div className="sticky top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
            <motion.button
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={onClose}
              className="pointer-events-auto group relative flex items-center justify-center gap-3 px-10 sm:px-12 pt-3 pb-3.5 bg-[#161D2A] text-white text-xs font-mono font-semibold uppercase tracking-widest rounded-b-2xl shadow-2xl border-b border-x border-white/10 hover:bg-[#FF4D2D] transition-all duration-300 hover:pt-4 hover:pb-4 cursor-pointer min-w-[200px]"
            >
              <svg
                className="absolute -left-4 -top-px w-4 h-4 text-[#161D2A] group-hover:text-[#FF4D2D] transition-colors fill-current pointer-events-none -scale-x-100"
                viewBox="0 0 16 16"
              >
                <path d="M 16 0 A 16 16 0 0 0 0 16 L 0 0 Z" />
              </svg>

              <svg
                className="absolute -right-4 -top-px w-4 h-4 text-[#161D2A] group-hover:text-[#FF4D2D] transition-colors fill-current pointer-events-none"
                viewBox="0 0 16 16"
              >
                <path d="M 16 0 A 16 16 0 0 0 0 16 L 0 0 Z" />
              </svg>

              <span>Закрыть</span>
              <span className="text-gray-400 group-hover:text-white transition-colors text-xs">
                ✕
              </span>
              <span className="ml-1 text-[10px] opacity-40 group-hover:opacity-80 font-normal">
                [ESC]
              </span>
            </motion.button>
          </div>

          {/* ОСНОВНОЙ КОНТЕНТ */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-10 lg:py-16 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start my-auto">
              
              {/* ЛЕВАЯ КОЛОНКА: НАВИГАЦИЯ */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <motion.span 
                  variants={itemVariants} 
                  className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 block"
                >
                  // Навигация
                </motion.span>

                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group relative flex items-center justify-between py-3 sm:py-4 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <div className="flex items-center gap-4 sm:gap-6 transform group-hover:translate-x-3 transition-transform duration-300 ease-out">
                          <span className="text-xs sm:text-sm font-mono font-medium text-gray-600 group-hover:text-[#FF4D2D] transition-colors duration-300">
                            [{link.number}]
                          </span>
                          <span>{link.label}</span>
                        </div>

                        <svg
                          className="w-7 h-7 sm:w-9 sm:h-9 text-[#FF4D2D] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>

                        {/* Ультра-мягкая деликатная линия (10% opacity) во всю ширину */}
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left pointer-events-none" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* ПРАВАЯ КОЛОНКА: СВЯЗЬ, СОЦСЕТИ, ЛОКАЦИЯ */}
              <div className="lg:col-span-5 flex flex-col space-y-7 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0">
                
                {/* 1. Плашка статуса */}
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/[0.06] border border-emerald-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.08)]">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-xs font-mono text-emerald-300/90 tracking-wider uppercase font-medium">
                      Открыт к предложениям
                    </span>
                  </div>
                </motion.div>

                {/* 2. Прямая связь */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block">
                    Прямая связь
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="group flex flex-wrap items-center gap-3 text-lg sm:text-2xl font-bold text-white hover:text-[#FF4D2D] transition-colors cursor-pointer text-left"
                  >
                    <span className="break-all">greensprites@gmail.com</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 group-hover:bg-[#FF4D2D] group-hover:text-white transition-all whitespace-nowrap">
                      {copied ? 'Скопировано' : 'Копировать'}
                    </span>
                  </button>
                </motion.div>

                {/* 3. Соцсети */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block">
                    Социальные сети & Профиль
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {socialLinks.map((social) =>
                      social.isLocked ? (
                        <div
                          key={social.name}
                          className="relative p-3.5 rounded-xl bg-white/[0.02] border border-white/5 opacity-40 blur-[1.5px] select-none pointer-events-none flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/5 text-gray-500">
                              {social.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-400">
                                {social.name}
                              </span>
                              <span className="text-[11px] font-mono text-gray-600">
                                {social.handle}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-400">
                            Скоро
                          </span>
                        </div>
                      ) : (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-[#FF4D2D]/50 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/5 text-gray-300 group-hover:text-[#FF4D2D] group-hover:bg-[#FF4D2D]/10 transition-colors">
                              {social.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-white group-hover:text-[#FF4D2D] transition-colors">
                                {social.name}
                              </span>
                              <span className="text-[11px] font-mono text-gray-400">
                                {social.handle}
                              </span>
                            </div>
                          </div>

                          <svg
                            className="w-4 h-4 text-gray-500 group-hover:text-[#FF4D2D] transform group-hover:translate-x-1 transition-all duration-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      )
                    )}
                  </div>
                </motion.div>

                {/* 4. Локация */}
                <motion.div 
                  variants={itemVariants} 
                  className="pt-5 border-t border-white/5 text-xs font-mono text-gray-500 flex justify-between items-center"
                >
                  <span>LOCATION: WORLDWIDE</span>
                  <span>UTC+3 (MSK)</span>
                </motion.div>

              </div>
            </div>
          </div>

          {/* ФУТЕР МЕНЮ */}
          <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-gray-500">
            <motion.div variants={itemVariants}>
              © 2026 NIKOLAY VISHNEV
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <span>DESIGN SYSTEM v2.4</span>
              <span>•</span>
              <span className="text-gray-400">NEXT.JS 15 & FRAMER MOTION</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}