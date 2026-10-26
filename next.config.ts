import type { NextConfig } from "next";

// whago.net is a static export served by Nginx on Lightsail.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default nextConfig;
