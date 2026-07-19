import type { NextConfig } from "next";

// Cloudflare Pages sets CF_PAGES=1 in its build env → produce a fully static
// `out/` export. Locally / in Docker we build a standalone Node server instead.
const isStaticExport =
  process.env.CF_PAGES === "1" || process.env.BUILD_TARGET === "export";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  // next/image optimization needs a server; disable it for the static export
  images: { unoptimized: isStaticExport },
};

export default nextConfig;
