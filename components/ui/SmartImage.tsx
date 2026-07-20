"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * next/image with a shimmer skeleton that fades out once the image loads.
 * Render it inside a `relative` container — the skeleton overlays that box,
 * paints over the (still-blank) image, and any scrim/caption after it stays on top.
 */
export default function SmartImage({ onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A cached image can finish before React attaches onLoad — catch that on mount.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      <Image
        {...props}
        ref={imgRef}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
      <span
        aria-hidden
        className={`skeleton pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
