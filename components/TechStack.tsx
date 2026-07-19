"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/LanguageContext";

const TECHS = [
  { name: "HTML5", src: "/img/icon-3d/icons8-html-5-64.png" },
  { name: "CSS3", src: "/img/icon-3d/icons8-css-100.png" },
  { name: "Vue.js", src: "/img/icon-3d/icons8-vue-js-64.png" },
  { name: "Node.js", src: "/img/icon-3d/icons8-node-js-48.png" },
  { name: "Flutter", src: "/img/icon-3d/icons8-flutter-24.png" },
  { name: "Java", src: "/img/icon-3d/icons8-java-100.png" },
];

export default function TechStack() {
  const { t } = useLanguage();
  // Two copies so the -50% shift loops seamlessly
  const row = [...TECHS, ...TECHS];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">{t.tech.tag}</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.tech.title}
          </h2>
        </Reveal>
      </div>

      <div className="marquee-mask relative mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
          {row.map((tech, i) => (
            <div
              key={i}
              className="liquid-glass mr-5 flex h-20 w-44 shrink-0 items-center justify-center gap-3 rounded-2xl px-5"
            >
              <Image
                src={tech.src}
                alt={tech.name}
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
              <span className="text-sm font-medium text-[var(--color-fg)]">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
