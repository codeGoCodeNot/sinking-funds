import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    staleTimes: {
      dynamic: 60 * 5,
      static: 3600,
    },
  },
};

export default nextConfig;
