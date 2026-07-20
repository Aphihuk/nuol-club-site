"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Branded splash shown on first load. It renders on the server too, so it
 * covers the pre-hydration flash, then fades out once the page has loaded —
 * with a small minimum on-screen time (no jarring flash) and a hard cap so it
 * can never get stuck if the `load` event never fires.
 */
export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const MIN = reduce ? 0 : 550; // avoid a jarring flash on fast loads
    const CAP = 3500; // never hang, even if `load` never fires

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN - (performance.now() - start));
      window.setTimeout(() => {
        setHidden(true);
        window.setTimeout(() => setMounted(false), 600); // unmount after fade
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = window.setTimeout(finish, CAP);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(cap);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`page-loader ${hidden ? "is-hidden" : ""}`}
      role="status"
      aria-live="polite"
    >
      <Image
        src="/img/logo/logo-culb.png"
        alt="FNS MAKER Club"
        width={96}
        height={96}
        priority
        className="page-loader__logo h-24 w-24 object-contain"
      />
      <div className="page-loader__bar">
        <span />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
