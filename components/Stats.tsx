"use client";

import { Reveal, RevealItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { useLanguage } from "@/lib/LanguageContext";

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-soft)] p-10 sm:p-14">
          <div className="aurora left-1/4 top-0 h-56 w-56 bg-[var(--color-accent-2)]/30" />
          <div className="aurora right-1/4 bottom-0 h-56 w-56 bg-[var(--color-accent)]/20" style={{ animationDelay: "-7s" }} />

          <Reveal
            stagger={0.1}
            className="relative grid grid-cols-2 gap-8 text-center lg:grid-cols-4"
          >
            {t.stats.items.map((s, i) => (
              <RevealItem key={i}>
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  <span className="gradient-text">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{s.label}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
