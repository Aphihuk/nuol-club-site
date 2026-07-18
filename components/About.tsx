"use client";

import Image from "next/image";
import { Target, Eye } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal direction="right">
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {t.about.tag}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t.about.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {t.about.body}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              { icon: Target, ...t.about.mission },
              { icon: Eye, ...t.about.vision },
            ].map((card, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <card.icon className="mb-3 text-[var(--color-accent)]" size={24} />
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{card.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="left" className="relative">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-accent-3)]/30 blur-2xl" />
            <div className="glass relative flex h-full items-center justify-center rounded-[2rem] p-10">
              <Image
                src="/img/logo/logo-fns.jpeg"
                alt="Faculty of Natural Sciences"
                width={320}
                height={320}
                className="rounded-2xl object-contain"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
