"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = 32;

function variants(direction: Direction): Variants {
  const from =
    direction === "up"
      ? { y: offset }
      : direction === "down"
      ? { y: -offset }
      : direction === "left"
      ? { x: offset }
      : direction === "right"
      ? { x: -offset }
      : {};

  return {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/**
 * Fade/slide an element into view on scroll. Set `stagger` on a parent Reveal
 * and use RevealItem children to cascade a list.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  stagger,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={
        stagger
          ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
          : variants(direction)
      }
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  direction = "up",
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variants(direction)}>
      {children}
    </motion.div>
  );
}
