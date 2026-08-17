import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ideasforyoutubers.com" }],
        destination: "https://www.ideasforyoutubers.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
