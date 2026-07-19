"use client";

import Image from "next/image";
import { MessageCircle, Send, Music2, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const EMAIL = "fnsclub@nuol.edu.la";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#focus", label: t.nav.focus },
    { href: "#performance", label: t.nav.performance },
    { href: "#team", label: t.nav.team },
  ];

  const socials = [
    { icon: MessageCircle, href: "#", label: "Facebook" },
    { icon: Send, href: "#", label: "Telegram" },
    { icon: Music2, href: "https://www.tiktok.com/@nuolmaker_cs", label: "TikTok" },
    { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
  ];

  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
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

        {/* Quick links */}
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

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold">{t.nav.contact}</h4>
          <p className="mt-4 max-w-xs text-sm text-[var(--color-muted)]">{t.contact.subtitle}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
          >
            <Mail size={16} className="text-[var(--color-accent)]" />
            {EMAIL}
          </a>

          <p className="mt-6 text-sm text-[var(--color-muted)]">{t.contact.socials}</p>
          <div className="mt-3 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Faculty emblem */}
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
