/** @type {import('next').NextConfig} */
const nextConfig = {
  // For when deployed with Docker (on Railway, etc.)
  // output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "steamcommunity-a.akamaihd.net",
      },
      {
        hostname: "steamcdn-a.akamaihd.net",
      },
      {
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
