"use client";

import Image from "next/image";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/LanguageContext";

export default function Team() {
  const { t } = useLanguage();

  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 ">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.team.tag}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t.team.title}
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">{t.team.subtitle}</p>
        </Reveal>

        <Reveal
          stagger={0.08}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {t.team.members.map((m, i) => (
            <RevealItem key={i}>
              <div className="liquid-glass group relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* gradient scrim + slide-up detail */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-base font-semibold leading-tight">{m.name}</h3>
                    <p className="mt-1 text-xs text-[var(--color-accent)]">{m.role}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
