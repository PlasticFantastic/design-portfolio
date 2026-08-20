// src/components/CopyEmailButton.tsx
'use client';

import { useState } from 'react';

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-mono text-gray-300 hover:text-white group relative"
    >
      <span>✉️ {email}</span>
      <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px]">
        {copied ? 'Скопировано! ✓' : 'Копировать'}
      </span>
    </button>
  );
}