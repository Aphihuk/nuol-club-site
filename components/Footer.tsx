"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#focus", label: t.nav.focus },
    { href: "#performance", label: t.nav.performance },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo/logo-culb.png"
              alt="Club logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-sm font-semibold">
              FNS <span className="gradient-text">Club</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-[var(--color-muted)]">{t.footer.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t.footer.quickLinks}</h4>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start md:justify-end">
          <Image
            src="/img/logo/logo-fns.png"
            alt="Faculty of Natural Sciences"
            width={72}
            height={72}
            className="h-16 w-16 rounded-xl object-contain opacity-80"
          />
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] py-5">
        <p className="text-center text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} FNS Student Club, NUOL. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
