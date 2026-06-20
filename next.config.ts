import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Imagery is self-hosted in /public/media, so no remote patterns are needed.
};

export default nextConfig;
