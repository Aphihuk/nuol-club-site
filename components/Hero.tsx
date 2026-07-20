"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = t.hero.titleHighlight.split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-0">
        <Image
          src="/img/logo/herobar.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/70 via-[var(--color-bg)]/85 to-[var(--color-bg)]/70" />
      </motion.div>

      {/* Grid + aurora accents */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div className="aurora -z-10 left-[-6rem] top-[-4rem] h-72 w-72 bg-[var(--color-accent)]/40" />
      <div className="aurora -z-10 right-[-4rem] top-40 h-80 w-80 bg-[var(--color-accent-3)]/40" style={{ animationDelay: "-5s" }} />

      <motion.div
        style={{ y: contentY, opacity }}
        className="mx-auto max-w-7xl px-5 pt-28 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-1.5 text-xs text-[var(--color-muted)]"
        >
          <Sparkles size={14} className="text-[var(--color-accent)]" />
          {t.hero.badge}
        </motion.div>

        <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="block"
          >
            {t.hero.titleLead}
          </motion.span>
          <span className="mt-2 flex flex-wrap gap-x-3">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                className="gradient-text"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 max-w-2xl text-base text-[var(--color-muted)] sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          {/* use play kahoot */}
          <a
            href="https://kahoot.it/?pin=294212&refer_method=link"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3 text-sm font-semibold text-[#04121a] transition-transform hover:scale-105"
          >
            
            {/* ໄຊ້ເເທ້ ເເມ່ນ line 107-110 */}

            {/* <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3 text-sm font-semibold text-[#04121a] transition-transform hover:scale-105"
          > */}
            
            {t.hero.ctaPrimary}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#team"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-[var(--color-border)] p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-[var(--color-accent)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
