// src/components/ScrollProgress.tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Плавная физика пружины без рывков
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(168,85,247,0.8)]"
    />
  );
}