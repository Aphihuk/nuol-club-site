"use client";

import { useState } from "react";
import { MessageCircle, Send as SendIcon, Mail, Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Club inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:fnsclub@nuol.edu.la?subject=${subject}&body=${body}`;
  };

  const socials = [
    { icon: MessageCircle, href: "#", label: "Facebook" },
    { icon: SendIcon, href: "#", label: "Telegram" },
    { icon: Mail, href: "mailto:fnsclub@nuol.edu.la", label: "Email" },
  ];

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-3 text-sm text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">{t.contact.subtitle}</p>

            <div className="mt-8">
              <p className="text-sm text-[var(--color-muted)]">{t.contact.socials}</p>
              <div className="mt-3 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <form onSubmit={handleSubmit} className="liquid-glass space-y-4 rounded-2xl p-6 sm:p-8">
              <input
                required
                type="text"
                placeholder={t.contact.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                required
                type="email"
                placeholder={t.contact.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              <textarea
                required
                rows={4}
                placeholder={t.contact.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] px-6 py-3 text-sm font-semibold text-[#04121a] transition-transform hover:scale-[1.02]"
              >
                {t.contact.send}
                <Send size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
