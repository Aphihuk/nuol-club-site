import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained .next/standalone build for small Docker images
  output: "standalone",
};

export default nextConfig;
