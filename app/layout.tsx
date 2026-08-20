// src/app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Spotlight from "@/components/Spotlight";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nick Vishnev — Product & UX/UI Designer",
  description: "Портфолио продуктового и UX/UI дизайнера Николая Вишнева",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased relative bg-[#08080c] text-white font-sans selection:bg-purple-500 selection:text-white">
        <Spotlight />
        {children}
      </body>
    </html>
  );
}