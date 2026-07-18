"use client";

import { Cpu, Code, BarChart3, Palette, Video, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
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
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)]/90 to-[var(--color-bg)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.focus.tag}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t.focus.title}
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">{t.focus.subtitle}</p>
        </Reveal>

        <Reveal
          stagger={0.12}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.focus.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Cpu;
            return (
              <RevealItem key={item.title}>
                <div className="liquid-glass group relative h-full overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5">
                  {/* hover glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-accent-2)]/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-3)]/20 text-[var(--color-accent)] ring-1 ring-[var(--color-border)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.desc}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
