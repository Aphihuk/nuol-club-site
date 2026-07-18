"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/LanguageContext";
import type { ShowcaseItem } from "@/lib/content";

function VideoCard({ item }: { item: ShowcaseItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, [reduce]);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="liquid-glass group relative w-full max-w-[300px] overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={togglePlay}
        aria-label="Play or pause"
        className="relative block aspect-[9/16] w-full"
      >
        <video
          ref={ref}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        {/* readability scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
        {/* center play/pause hint */}
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur">
            {playing ? <Pause size={20} /> : <Play size={20} className="translate-x-0.5" />}
          </span>
        </span>
      </button>

      {/* mute toggle */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-[var(--color-accent)] hover:text-[#04121a]"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* caption + external link */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
        <span className="text-sm font-medium text-white">{item.title}</span>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Watch on TikTok"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-[var(--color-accent)] hover:text-[#04121a]"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

function ImageCard({ item }: { item: ShowcaseItem }) {
  return (
    <div className="liquid-glass group relative w-full max-w-[520px] overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="text-sm font-medium text-white">{item.title}</span>
      </div>
    </div>
  );
}

export default function Performance() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const groups = t.performance.groups;
  const [active, setActive] = useState(groups[0]?.key ?? "");

  const current = groups.find((g) => g.key === active) ?? groups[0];

  return (
    <section id="performance" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          src="/video/backgroup-performance.mp4"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)]/85 to-[var(--color-bg)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.performance.tag}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t.performance.title}
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">{t.performance.subtitle}</p>
        </Reveal>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {groups.map((g) => {
            const isActive = g.key === active;
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => setActive(g.key)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-[#04121a]" : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="perfTab"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Media grid */}
        <div className="mt-12 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap justify-center gap-6"
            >
              {current.items.map((item) =>
                item.type === "video" ? (
                  <VideoCard key={item.src} item={item} />
                ) : (
                  <ImageCard key={item.src} item={item} />
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
