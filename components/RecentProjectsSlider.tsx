'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  video?: string;
  image?: StaticImageData | string;
  link: string;
}

const projects: Project[] = [
  {
    id: 'slimmer-doc',
    title: 'Slimmer Doc — HealthTech Platform',
    category: 'HealthTech / B2B',
    year: '2026',
    video: '/motion/slimmer-doc.mp4',
    link: '/cases/slimmer-doc',
  },
  {
    id: 'slimmer',
    title: 'Slimmer — HealthTech Ecosystem',
    category: 'HealthTech',
    year: '2026',
    image: '/cases/slimmer/cover.webp',
    link: '/cases/slimmer',
  },
  {
    id: 'uni',
    title: 'Юнисервис Капитал',
    category: 'FinTech',
    year: '2025',
    image: '/cases/uni/cover.webp',
    link: '/cases/uni',
  },
];

const SLIDE_DURATION = 5000;
const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 90 : -90,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function RecentProjectsSlider() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentIndex = ((page % projects.length) + projects.length) % projects.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    setProgress(0);
  }, []);

  // Таймер заполнения прогресс-бара
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 40;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        return next >= 100 ? 100 : next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Переключение слайда при достижении 100%
  useEffect(() => {
    if (progress >= 100) {
      paginate(1);
    }
  }, [progress, paginate]);

  const currentProject = projects[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full lg:max-w-[400px] lg:ml-auto group/slider select-none"
    >
      {/* ЯЗЫЧОК */}
      <Link
        href="/cases"
        className="group/tab absolute bottom-full right-6 z-0 translate-y-1 inline-flex items-center px-6 pt-2 pb-2.5 bg-[#111827] hover:bg-[#FF4D2D] text-white rounded-t-xl transition-colors duration-300 shadow-md cursor-pointer"
      >
        <svg
          className="absolute -left-[15px] bottom-0 w-4 h-4 text-[#111827] group-hover/tab:text-[#FF4D2D] transition-colors duration-300 fill-current pointer-events-none"
          viewBox="0 0 16 16"
        >
          <path d="M 16 0 A 16 16 0 0 1 0 16 L 16 16 Z" />
        </svg>

        <svg
          className="absolute -right-[15px] bottom-0 w-4 h-4 text-[#111827] group-hover/tab:text-[#FF4D2D] transition-colors duration-300 fill-current pointer-events-none"
          viewBox="0 0 16 16"
        >
          <path d="M 0 0 A 16 16 0 0 0 16 16 L 0 16 Z" />
        </svg>

        <div className="flex items-center">
          <span className="font-mono text-[11px] font-bold tracking-wider shrink-0">
            0{currentIndex + 1}
            <span className="text-white/40 font-normal">/0{projects.length}</span>
          </span>

          <div className="grid grid-cols-[0fr] group-hover/tab:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[0.16,1,0.3,1]">
            <div className="overflow-hidden flex items-center opacity-0 group-hover/tab:opacity-100 transition-opacity duration-300 ease-in-out">
              <span className="whitespace-nowrap font-sans text-xs font-semibold pl-2.5 pr-1.5">
                Смотреть все проекты
              </span>
              <svg
                className="w-3.5 h-3.5 shrink-0 text-white/90 group-hover/tab:text-white transition-transform duration-300 group-hover/tab:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      {/* ОСНОВНАЯ КАРТОЧКА СЛАЙДЕРА */}
      <div className="relative z-10 w-full bg-white/80 border border-gray-200/80 rounded-2xl p-2.5 shadow-sm backdrop-blur-md overflow-visible flex flex-col gap-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-900 border border-gray-200/60 touch-pan-y">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (offset.x < -SWIPE_THRESHOLD || swipe < -500) {
                  paginate(1);
                } else if (offset.x > SWIPE_THRESHOLD || swipe > 500) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {currentProject.video ? (
                <video
                  src={currentProject.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.14] transform origin-center pointer-events-none"
                />
              ) : currentProject.image ? (
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  draggable={false}
                  className="object-cover scale-[1.14] transform origin-center pointer-events-none"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 text-center text-white pointer-events-none">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    Preview Placeholder
                  </span>
                </div>
              )}

              <Link
                href={currentProject.link}
                className="absolute inset-0 z-10"
                aria-label={currentProject.title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/slider:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 text-white z-20 pointer-events-none">
                <div className="flex justify-between items-center transform -translate-y-2 group-hover/slider:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-mono text-white/90 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/15">
                    {currentProject.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/60">
                    {currentProject.year}
                  </span>
                </div>

                <div className="transform translate-y-2 group-hover/slider:translate-y-0 transition-transform duration-300 space-y-2.5">
                  <h3 className="text-sm font-bold font-sans text-white leading-snug drop-shadow-sm">
                    {currentProject.title}
                  </h3>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <Link
                      href={currentProject.link}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF4D2D] text-white text-xs font-semibold shadow-md hover:bg-white hover:text-[#111827] transition-colors"
                    >
                      <span>Подробнее</span>
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Link>

                    <Link
                      href="/cases"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-colors"
                    >
                      <span>Все проекты</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ПРОГРЕСС-БАР */}
        <div className="w-full h-1 bg-gray-200/60 rounded-full overflow-visible pointer-events-none">
          <div
            className="h-full bg-[#FF4D2D] rounded-full transition-all duration-75 ease-linear shadow-[0_2px_8px_rgba(255,77,45,0.4),0_-2px_6px_rgba(255,77,45,0.25)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}