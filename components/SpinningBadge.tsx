// src/components/SpinningBadge.tsx
'use client';

import { motion } from 'framer-motion';

export default function SpinningBadge() {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
      {/* Текст по кругу */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="circlePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="text-[10px] font-mono tracking-widest uppercase fill-gray-800 font-bold">
            <textPath href="#circlePath">
              • HIRE ME • AVAILABLE FOR WORK •
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Центральная иконка */}
      <div className="w-10 h-10 rounded-full bg-[#FF4D2D] text-white flex items-center justify-center shadow-lg shadow-[#FF4D2D]/30 text-xs">
        ➔
      </div>
    </div>
  );
}