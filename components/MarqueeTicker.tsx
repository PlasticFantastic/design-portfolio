// src/components/MarqueeTicker.tsx
'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  "HEALTHTECH UI", "DESIGN SYSTEMS", "CJM & USER FLOWS", 
  "PROTOTYPING", "TELEHEALTH", "UX RESEARCH", "MOBILE APPS"
];

export default function MarqueeTicker() {
  return (
    <div className="w-full bg-[#111827] text-white py-3 overflow-hidden border-t border-gray-800 flex items-center select-none">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
        className="flex whitespace-nowrap gap-8 items-center font-mono text-xs tracking-wider"
      >
        {[...ITEMS, ...ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-semibold">{item}</span>
            <span className="text-[#FF4D2D] text-sm">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}