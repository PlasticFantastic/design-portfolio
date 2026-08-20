// src/components/ScrollReveal.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}: ScrollRevealProps) {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case 'down':
        return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case 'left':
        return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
      case 'right':
        return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
      case 'scale':
        return { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
      default:
        return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Кастомный cubic-bezier для премиальной мягкости
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}