// src/components/ParallaxWrapper.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

export default function ParallaxWrapper({
  children,
  offset = 40,
  className = '',
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Движение по оси Y в зависимости от прокрутки
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}