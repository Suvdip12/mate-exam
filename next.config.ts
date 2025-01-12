import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*", // Matches all routes
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate", // Forces browser to check for updates
          },
        ],
      },
    ];
  },
};

export default nextConfig;
