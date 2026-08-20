// components/MicroConfetti.tsx
'use client';

import { motion } from 'framer-motion';

export function MicroConfetti() {
  const particles = Array.from({ length: 24 });
  const colors = ['#FF4D2D', '#111827', '#FF8C00', '#FFC107', '#3B82F6', '#10B981'];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-0 pointer-events-none z-50 overflow-visible">
      {particles.map((_, i) => {
        const randomX = (Math.random() - 0.5) * 180;
        const randomY = -(Math.random() * 100 + 50);
        const randomRotate = Math.random() * 360;
        const color = colors[i % colors.length];
        const leftPosition = `${(i / (particles.length - 1)) * 94 + 3}%`;

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1.2, 0.9, 0],
              x: randomX,
              y: randomY,
              rotate: randomRotate,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: (i % 6) * 0.03,
            }}
            className="absolute bottom-0 rounded-full"
            style={{
              width: i % 3 === 0 ? '8px' : '5px',
              height: i % 3 === 0 ? '8px' : '5px',
              backgroundColor: color,
              left: leftPosition,
            }}
          />
        );
      })}
    </div>
  );
}