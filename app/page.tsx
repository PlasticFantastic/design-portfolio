// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, AnimatePresence, cubicBezier } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Oswald } from 'next/font/google';

import HeroGlowCanvas from '@/components/HeroGlowCanvas';
import FullscreenMenu from '@/components/FullscreenMenu';
import RecentProjectsSlider from '@/components/RecentProjectsSlider';

import mePhoto from '@/app/img/me.png';

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

const sparkEase = cubicBezier(0.25, 0.1, 0.25, 1);

// Конфигурация точек вылета искр для кнопки проектов
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

// Анимация букв заголовка NIKOLAY VISHNEV
const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.05,
    },
  },
};

const letterVariants = {
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
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Варианты анимации для поочередного появления плашек
const tagsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const tagItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    scale: 0.95,
    filter: 'blur(4px)',
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.35, 
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface TypewriterProps {
  onComplete?: () => void;
}

// Замена пробелов после предлогов и союзов на неразрывные (\u00A0)
const fixPrepositions = (text: string) => {
  return text.replace(
    /(?<=^|[\s\u00A0(«"„])(в|во|и|или|к|ко|о|об|обо|с|со|у|а|на|по|из|за|от|до|без|над|под|при|про|для|но|да|ни|не|by|in|on|at|to|of|for|or|and)\s+/gi,
    '$1\u00A0'
  );
};

// Компонент набора текста с правильной типографикой
function TypewriterDescription({ onComplete }: TypewriterProps) {
  const rawPrimary = "Проектирую веб-сервисы и мобильные приложения ";
  const rawSecondary = "с акцентом на понятный UX и внимание к деталям";

  const primaryText = fixPrepositions(rawPrimary);
  const secondaryText = fixPrepositions(rawSecondary);

  const fullText = primaryText + secondaryText;
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedLength((prev) => {
          if (prev < fullText.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 22);
    }, 400);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [fullText.length]);

  useEffect(() => {
    if (displayedLength >= fullText.length && fullText.length > 0 && !isTypingComplete) {
      setIsTypingComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [displayedLength, fullText.length, isTypingComplete, onComplete]);

  const currentPrimary = fullText.slice(0, Math.min(displayedLength, primaryText.length));
  const currentSecondary =
    displayedLength > primaryText.length
      ? fullText.slice(primaryText.length, displayedLength)
      : '';

  return (
    <div className="relative font-sans leading-[1.3] tracking-tight text-2xl sm:text-2xl lg:text-[24px] xl:text-[26px] text-[#111827] text-left w-full">
      {/* Невидимый слой-фантом: держит точную высоту блока */}
      <div className="invisible pointer-events-none select-none" aria-hidden="true">
        <span className="font-black mr-2 sm:mr-2.5 inline-block">/</span>
        <span className="font-bold">{primaryText}</span>
        <span className="font-normal">{secondaryText}</span>
      </div>

      {/* Видимый печатный слой */}
      <div className="absolute inset-0">
        <span className="text-[#FF4D2D] font-black mr-2 sm:mr-2.5 select-none inline-block">
          /
        </span>

        <span className="font-bold text-[#111827]">
          {currentPrimary}
        </span>

        <span className="font-normal text-gray-400/90 transition-colors duration-300">
          {currentSecondary}
        </span>

        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' as const }}
            className="inline-block w-[2.5px] h-[0.85em] bg-[#FF4D2D] align-baseline ml-1 -mb-0.5"
          />
        )}
      </div>
    </div>
  );
}

// Кнопка перехода к проектам для мобильной версии
function MobileProjectsSparkButton() {
  return (
    <div className="relative py-8 sm:py-10 flex justify-center items-center lg:hidden">
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
              ease: sparkEase,
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

      <Link
        href="/cases"
        className="group relative z-10 inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#111827] text-white text-xs font-mono font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-[#FF4D2D] hover:shadow-[0_0_40px_rgba(255,77,45,0.45)] hover:scale-105 active:scale-95 border border-white/10"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        <span>Все проекты</span>
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

export default function Home() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextFinished, setIsTextFinished] = useState(false);

  // Состояния для ховера фотографии и расширения круга
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [clickCoords, setClickCoords] = useState<{ x: number; y: number } | null>(null);

  // Framer Motion значения для движения курсора внутри фото
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 220 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanding) return;
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handlePhotoClick = (e: React.MouseEvent) => {
    if (isExpanding) return;
    setClickCoords({ x: e.clientX, y: e.clientY });
    setIsExpanding(true);
  };

  const firstName = "NIKOLAY";
  const lastName = "VISHNEV";

  // Список бейджей
  const badges = ['Web Apps', 'Mobile Apps', 'Product Design', 'HealthTech', 'AI Workflow', 'B2C', 'B2B'];

  return (
    <main className="relative min-h-screen lg:h-screen w-full bg-[#F8F9FA] text-[#111827] overflow-y-auto lg:overflow-hidden flex flex-col justify-between font-sans select-none antialiased pt-24 lg:pt-20">
      
      {/* Фоновый градиент */}
      <HeroGlowCanvas />
      
      {/* Полноэкранное меню */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* МИНИМАЛИСТИЧНЫЙ ХЕДЕР */}
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

      {/* HERO SECTION */}
      <section className="relative flex-1 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-between items-center pt-2 lg:pt-0 overflow-hidden">
        
        {/* 1. ЗАГОЛОВОК НИКОЛАЙ ВИШНЕВ */}
        <div className="relative lg:absolute lg:-top-2 inset-x-0 z-10 w-full px-0 lg:px-16 pointer-events-none flex justify-center items-center py-2 lg:py-4 overflow-visible">
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            className={`${oswald.className} w-full flex justify-between items-center gap-3 sm:gap-0 text-[11.8vw] sm:text-[11vw] lg:text-[12.5vw] xl:text-[13.2vw] 2xl:text-[13.5vw] leading-none font-bold text-[#111827] uppercase whitespace-nowrap select-none transform scale-y-[1.48] origin-center`}
          >
            <span className="inline-flex tracking-tighter">
              {firstName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="inline-flex tracking-tighter">
              {lastName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </div>

        {/* 2. ФОТОГРАФИЯ */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const}}
          onMouseEnter={() => setIsPhotoHovered(true)}
          onMouseLeave={() => setIsPhotoHovered(false)}
          onMouseMove={handlePhotoMouseMove}
          onClick={handlePhotoClick}
          className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-20 w-full lg:w-auto h-[50vh] sm:h-[54vh] lg:h-[92vh] lg:max-h-[1000px] flex items-end justify-center overflow-hidden lg:overflow-visible -mt-16 sm:-mt-24 lg:mt-0 lg:translate-y-0 mb-2 lg:mb-0 cursor-none group"
        >
          <Image
            src={mePhoto}
            alt="Nikolay Vishnev"
            priority
            className="h-full w-auto object-cover lg:object-contain object-bottom origin-bottom block scale-[1.12] sm:scale-100 drop-shadow-none lg:drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)] [mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.1)_8%,rgba(0,0,0,0.4)_20%,rgba(0,0,0,0.8)_35%,black_55%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.1)_8%,rgba(0,0,0,0.4)_20%,rgba(0,0,0,0.8)_35%,black_55%)] lg:[mask-image:none] lg:[-webkit-mask-image:none] pointer-events-auto transition-transform duration-300"
          />

          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 lg:hidden bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/70 to-transparent pointer-events-none z-10" />

          <AnimatePresence>
            {isPhotoHovered && !isExpanding && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                style={{
                  left: cursorXSpring,
                  top: cursorYSpring,
                }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FF4D2D] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center text-center shadow-2xl backdrop-blur-md"
              >
                <span className="flex items-center gap-1.5">
                  Обо мне
                  <svg
                    className="w-4 h-4 text-white shrink-0 -rotate-45"
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
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 3. БОКОВЫЕ ИНФО-БЛОКИ И СЛАЙДЕР В СЕТКЕ */}
        <div className="relative z-30 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start lg:items-end pb-8 lg:pb-6 mt-auto">
          
          {/* ЛЕВЫЙ БЛОК */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-1 lg:col-span-4 xl:col-span-4 lg:max-w-[400px] xl:max-w-[440px] flex flex-col justify-start items-start gap-4 w-full"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-3 sm:py-1 rounded-full bg-white/80 border border-gray-200/80 shadow-xs backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D2D]" />
              <span className="text-[11px] sm:text-[10px] font-mono font-bold text-[#111827] tracking-widest uppercase">
                Product UX/UI Designer
              </span>
            </div>

            <TypewriterDescription onComplete={() => setIsTextFinished(true)} />

            <motion.div 
              variants={tagsContainerVariants}
              initial="hidden"
              animate={isTextFinished ? "visible" : "hidden"}
              className="flex flex-wrap gap-1.5 pt-1"
            >
              {badges.map((badge) => (
                <motion.span
                  key={badge}
                  variants={tagItemVariants}
                  className="px-3 py-1 rounded-lg bg-[#111827] border border-gray-200/80 text-white text-[11px] font-semibold shadow-xs hover:border-[#FF4D2D] hover:text-[#FF4D2D] transition-colors cursor-default"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isTextFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex items-center gap-4 text-[11px] font-mono text-gray-400 pt-2 border-t border-gray-200/50 w-full"
            >
              <span>Remote</span>
              <span>•</span>
              <span>Open to work</span>
            </motion.div>
          </motion.div>

          <div className="hidden lg:block lg:col-span-2 xl:col-span-2 pointer-events-none h-1" />

          {/* ПРАВЫЙ БЛОК С КЕЙСАМИ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-1 lg:col-span-6 xl:col-span-6 w-full flex flex-col items-stretch [&>*]:w-full"
          >
            <RecentProjectsSlider />
            <MobileProjectsSparkButton />
          </motion.div>

        </div>

      </section>

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

      {/* ЭКРАННЫЙ ОВЕРЛЕЙ-РАСШИРИТЕЛЬ */}
      <AnimatePresence>
        {isExpanding && clickCoords && (
          <motion.div
            initial={{ scale: 1, backgroundColor: '#FF4D2D' }}
            animate={{
              scale: 85,
              backgroundColor: ['#FF4D2D', '#FF4D2D', '#F8F9FA'],
            }}
            transition={{
              duration: 0.85,
              times: [0, 0.55, 1],
              ease: [0.76, 0, 0.24, 1] as const,
            }}
            onAnimationComplete={() => router.push('/about')}
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