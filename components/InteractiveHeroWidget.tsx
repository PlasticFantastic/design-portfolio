// src/components/InteractiveHeroWidget.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveHeroWidget() {
  const [activeTab, setActiveTab] = useState<'healthtech' | 'cjm' | 'uikit'>('healthtech');
  const [metricValue, setMetricValue] = useState(84);

  return (
    <div className="w-full rounded-3xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden group">
      {/* Декоративная шапка окна */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-[11px] font-mono text-gray-400 ml-2">product_preview.fig</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
          PROTOTYPE
        </span>
      </div>

      {/* Переключатель вкладок */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl mb-5 text-xs font-medium">
        <button
          onClick={() => setActiveTab('healthtech')}
          className={`py-2 rounded-lg transition-all ${
            activeTab === 'healthtech' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          HealthTech
        </button>
        <button
          onClick={() => setActiveTab('cjm')}
          className={`py-2 rounded-lg transition-all ${
            activeTab === 'cjm' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          User Flow
        </button>
        <button
          onClick={() => setActiveTab('uikit')}
          className={`py-2 rounded-lg transition-all ${
            activeTab === 'uikit' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          Design System
        </button>
      </div>

      {/* Содержимое вкладок */}
      <div className="min-h-[200px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === 'healthtech' && (
            <motion.div
              key="healthtech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center bg-white/5 p-3.5 rounded-2xl border border-white/5">
                <div>
                  <div className="text-xs text-gray-400 font-mono">Slimmer App • Patient Retention</div>
                  <div className="text-lg font-bold text-white mt-0.5">Индекс активности</div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">+{metricValue}%</span>
                </div>
              </div>

              {/* Интерактивный ползунок */}
              <div className="space-y-2 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                <div className="flex justify-between text-xs font-mono text-gray-300">
                  <span>Симуляция конверсии CJM:</span>
                  <span className="text-purple-400">{metricValue}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={metricValue}
                  onChange={(e) => setMetricValue(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-1.5 bg-gray-800 rounded-lg"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'cjm' && (
            <motion.div
              key="cjm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono">1</span>
                <div>
                  <div className="text-xs font-bold text-white">Онбординг пациента</div>
                  <div className="text-[11px] text-gray-400">Анкетирование и выбор врача</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-mono">2</span>
                <div>
                  <div className="text-xs font-bold text-white">Запись на онлайн-звонок</div>
                  <div className="text-[11px] text-gray-400">Интеграция с расписанием</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'uikit' && (
            <motion.div
              key="uikit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-center">
                <span className="text-[10px] font-mono text-purple-300 block mb-1">Primary Color</span>
                <span className="text-xs font-bold text-white">#9333EA</span>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                <span className="text-[10px] font-mono text-emerald-300 block mb-1">Success Tokens</span>
                <span className="text-xs font-bold text-white">#34D399</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[11px] font-mono text-gray-400">
          <span>Figma Auto Layout 5.0</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Pixel Perfect
          </span>
        </div>
      </div>
    </div>
  );
}