"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Target, Eye } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const floatRef = useRef<HTMLDivElement>(null);

  // Interactive 3D tilt: follows the mouse on desktop, the device gyroscope
  // on phones/tablets. Falls back to a gentle idle sway when there's no input.
  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (n: number) => Math.max(-1, Math.min(1, n));
    const MAX_X = 14; // deg of front/back tilt
    const MAX_Y = 20; // deg of left/right tilt

    let targetRX = 0;
    let targetRY = 0;
    let curRX = 0;
    let curRY = 0;
    let t = 0;
    let raf = 0;

    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      targetRY = clamp(dx) * MAX_Y;
      targetRX = clamp(-dy) * MAX_X;
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right [-90..90]
      const beta = e.beta ?? 0; // front/back [-180..180]
      targetRY = clamp(gamma / 40) * MAX_Y;
      targetRX = clamp((beta - 45) / 40) * MAX_X; // hold phone ~45° upright
    };

    const loop = () => {
      t += 0.016;
      const idleX = Math.sin(t * 0.7) * 2.5;
      const idleY = Math.cos(t * 0.5) * 2.5;
      curRX += (targetRX + idleX - curRX) * 0.08;
      curRY += (targetRY + idleY - curRY) * 0.08;
      el.style.setProperty("--erx", curRX.toFixed(2) + "deg");
      el.style.setProperty("--ery", curRY.toFixed(2) + "deg");
      el.style.setProperty("--ey", (Math.sin(t * 0.9) * 8).toFixed(2) + "px");
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const DOE = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> })
      | undefined;
    let askPermission: (() => void) | null = null;

    if (fine || !DOE) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    } else if (typeof DOE.requestPermission === "function") {
      // iOS 13+: needs a user gesture to grant motion access
      askPermission = () => {
        DOE.requestPermission?.()
          .then((s) => {
            if (s === "granted")
              window.addEventListener("deviceorientation", onOrient);
          })
          .catch(() => {});
        window.removeEventListener("touchend", askPermission!);
        window.removeEventListener("click", askPermission!);
      };
      window.addEventListener("touchend", askPermission, { once: true });
      window.addEventListener("click", askPermission, { once: true });
    } else {
      window.addEventListener("deviceorientation", onOrient);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onOrient);
      if (askPermission) {
        window.removeEventListener("touchend", askPermission);
        window.removeEventListener("click", askPermission);
      }
    };
  }, []);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal direction="right">
          <span className="eyebrow">{t.about.tag}</span>
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
                className="liquid-glass rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <card.icon className="mb-3 text-[var(--color-accent)]" size={24} />
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{card.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="left" className="relative">
          <div className="emblem-stage relative mx-auto aspect-square max-w-md">
            <div className="liquid-glass emblem-card relative h-full w-full rounded-[2rem] p-8">
              <div
                ref={floatRef}
                className="emblem-float absolute inset-0 flex items-center justify-center"
              >
                <div className="emblem-plate" aria-hidden />
                <Image
                  src="/img/logo/logo-fns.png"
                  alt="Faculty of Natural Sciences"
                  width={360}
                  height={360}
                  className="emblem-logo object-contain"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
