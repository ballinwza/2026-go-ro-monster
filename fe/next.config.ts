import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    return config
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.gnjoy.in.th",
      },
    ],
  },
}

export default nextConfig
