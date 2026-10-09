import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const frame = [
      {
        key: "Content-Security-Policy",
        value: "frame-ancestors *",
      },
    ];
    return [
      { source: "/embed", headers: frame },
      { source: "/embed/:path*", headers: frame },
    ];
  },
};

export default nextConfig;
