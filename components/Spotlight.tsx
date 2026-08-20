// src/components/Spotlight.tsx
'use client';

import { useEffect, useState } from 'react';

export default function Spotlight() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.12), transparent 80%)`,
      }}
    />
  );
}