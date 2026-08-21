'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, AnimatePresence, Variants } from 'framer-motion';
import { Oswald } from 'next/font/google';

import HeroGlowCanvas from '@/components/HeroGlowCanvas';
import FullscreenMenu from '@/components/FullscreenMenu';

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

// Анимация заглавных букв и цифр (404 / NOT FOUND)
const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const letterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Замена пробелов после предлогов и союзов на неразрывные (\u00A0)
const fixPrepositions = (text: string) => {
  return text.replace(
    /(?<=^|[\s\u00A0(«"„])(в|во|и|или|к|ко|о|об|обо|с|со|у|а|на|по|из|за|от|до|без|над|под|при|про|для|но|да|ни|не|by|in|on|at|to|of|for|or|and)\s+/gi,
    '$1\u00A0'
  );
};

function Typewriter404() {
  const primaryText = fixPrepositions("Кажется, этой страницы здесь нет ");
  const secondaryText = fixPrepositions("или пиксели просто решили уйти на перерыв");

  const fullText = primaryText + secondaryText;
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedLength((prev) => {
          if (prev < fullText.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 18);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [fullText.length]);

  useEffect(() => {
    if (displayedLength >= fullText.length && fullText.length > 0) {
      setIsTypingComplete(true);
    }
  }, [displayedLength, fullText.length]);

  const currentPrimary = fullText.slice(0, Math.min(displayedLength, primaryText.length));
  const currentSecondary =
    displayedLength > primaryText.length
      ? fullText.slice(primaryText.length, displayedLength)
      : '';

  return (
    <div className="relative font-sans leading-relaxed tracking-tight text-xl sm:text-2xl lg:text-3xl text-[#111827] text-center max-w-2xl px-2">
      <div className="invisible pointer-events-none select-none" aria-hidden="true">
        <span className="font-semibold">{primaryText}</span>
        <span className="font-normal">{secondaryText}</span>
      </div>

      <div className="absolute inset-0 flex justify-center flex-wrap">
        <span className="font-semibold text-[#111827]">{currentPrimary}</span>
        <span className="font-normal text-gray-400 transition-colors duration-300">
          {currentSecondary}
        </span>
        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            className="inline-block w-[3px] h-[0.9em] bg-[#FF4D2D] align-middle ml-1"
          />
        )}
      </div>
    </div>
  );
}

export default function NotFound() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [clickCoords, setClickCoords] = useState<{ x: number; y: number } | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 220 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanding) return;
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleReturnHome = (e: React.MouseEvent) => {
    if (isExpanding) return;
    setClickCoords({ x: e.clientX, y: e.clientY });
    setIsExpanding(true);
  };

  const errorCode = "404";
  const errorSub = "NOT FOUND";

  return (
    <main className="relative min-h-screen w-full bg-[#F8F9FA] text-[#111827] overflow-hidden flex flex-col justify-center font-sans select-none antialiased pt-16">
      
      {/* Фоновый интерактивный canvas */}
      <HeroGlowCanvas />

      {/* Полноэкранное меню */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ХЕДЕР */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none flex justify-center">
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

      {/* ЦЕНТРАЛЬНЫЙ БЛОК */}
      <section className="relative flex-1 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-center items-center overflow-hidden my-auto">
        
        {/* ГИГАНТСКИЙ МОНУМЕНТАЛЬНЫЙ 404 БЭКДРОП */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none opacity-[0.08] lg:opacity-[0.07] overflow-hidden">
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            className={`${oswald.className} text-[52vw] sm:text-[38vw] leading-none font-bold text-[#111827] uppercase whitespace-nowrap transform scale-y-[1.45] tracking-tighter`}
          >
            {errorCode.split('').map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* ОСНОВНОЙ ИНТЕРАКТИВНЫЙ КОНТЕНТ */}
        <div 
          className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto px-4 cursor-pointer md:cursor-none w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          onClick={handleReturnHome}
        >
          {/* Заголовок */}
          <motion.h2
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            className={`${oswald.className} text-[18vw] sm:text-[12vw] lg:text-[6.5vw] leading-[0.9] font-bold text-[#111827] uppercase tracking-tight transform scale-y-[1.3] mb-10 sm:mb-12 lg:mb-14`}
          >
            {errorSub.split('').map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>

          {/* Текст печати */}
          <div className="w-full flex justify-center mb-12 sm:mb-14 lg:mb-16">
            <Typewriter404 />
          </div>

          {/* КНОПКА: Только для мобильной версии (md:hidden) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pointer-events-auto md:hidden"
          >
            <button
              onClick={handleReturnHome}
              className="group relative inline-flex items-center gap-3.5 px-9 py-4 bg-[#111827] text-white font-mono text-xs uppercase tracking-widest rounded-full shadow-xl active:scale-[0.98] cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4D2D]" />
              <span>На главную</span>
              <svg
                className="w-4 h-4 text-gray-400 -rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>

          {/* Интерактивный курсор-магнит на десктопе */}
          <AnimatePresence>
            {isHovered && !isExpanding && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                style={{
                  left: cursorXSpring,
                  top: cursorYSpring,
                }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-30 w-28 h-28 rounded-full bg-[#FF4D2D] text-white font-mono font-bold text-[11px] uppercase tracking-wider flex items-center justify-center text-center shadow-2xl backdrop-blur-md hidden md:flex"
              >
                <span className="flex items-center gap-1.5">
                  ГЛАВНАЯ
                  <svg className="w-3.5 h-3.5 text-white shrink-0 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </section>

      {/* ПОЛНОЭКРАННЫЙ КРУГОВОЙ ПЕРЕХОД НА ГЛАВНУЮ */}
      <AnimatePresence>
        {isExpanding && clickCoords && (
          <motion.div
            initial={{ scale: 1, backgroundColor: '#FF4D2D' }}
            animate={{
              scale: 90,
              backgroundColor: ['#FF4D2D', '#FF4D2D', '#F8F9FA'],
            }}
            transition={{
              duration: 0.85,
              times: [0, 0.55, 1],
              ease: [0.76, 0, 0.24, 1] as const,
            }}
            onAnimationComplete={() => router.push('/')}
            style={{
              left: clickCoords.x,
              top: clickCoords.y,
            }}
            className="fixed -translate-x-1/2 -translate-y-1/2 z-[999] w-28 h-28 rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>

    </main>
  );
}