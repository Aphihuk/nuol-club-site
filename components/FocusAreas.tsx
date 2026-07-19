"use client";

import { useState } from "react";
import {
  Cpu,
  Code,
  BarChart3,
  Palette,
  Video,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/LanguageContext";

const ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  code: Code,
  "bar-chart": BarChart3,
  palette: Palette,
  video: Video,
};

export default function FocusAreas() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const items = t.focus.items;
  const [active, setActive] = useState(Math.floor(items.length / 2));

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));
  const go = (dir: number) => setActive((a) => clamp(a + dir));

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 28 };

  return (
    <section id="focus" className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient background video */}
      <div className="absolute inset-0 -z-10">
        <video
          src="/video/backgroup-What we do.mp4"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)]/20 to-[var(--color-bg)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.focus.tag}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t.focus.title}
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">{t.focus.subtitle}</p>
        </Reveal>

        {/* 3D center-mode carousel */}
        <div className="relative mx-auto mt-16 h-[430px] w-full max-w-5xl [perspective:1600px]">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Cpu;
            const offset = i - active;
            const abs = Math.abs(offset);
            const isActive = offset === 0;

            return (
              <motion.div
                key={item.title}
                className="absolute inset-x-0 top-1/2 mx-auto w-[280px] cursor-pointer select-none sm:w-[340px] [transform-style:preserve-3d]"
                style={{ zIndex: 20 - abs }}
                initial={false}
                animate={{
                  x: `${offset * 60}%`,
                  y: "-50%",
                  rotateY: offset * -38,
                  scale: 1 - abs * 0.16,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.28,
                }}
                transition={spring}
                onClick={() => !isActive && setActive(i)}
                aria-hidden={!isActive}
              >
                <div className="liquid-glass relative flex h-[380px] flex-col overflow-hidden rounded-3xl p-8">
                  {/* accent glow (active only) */}
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-accent-2)]/25 blur-3xl transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/25 to-[var(--color-accent-3)]/25 text-[var(--color-accent)] ring-1 ring-[var(--color-border)]">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.desc}
                  </p>

                  {/* dim recede overlay for side cards */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-3xl bg-[var(--color-bg)]/45 transition-opacity duration-300 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to ${item.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-[var(--color-accent)]"
                    : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-muted)]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === items.length - 1}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
