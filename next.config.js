/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "steamcommunity-a.akamaihd.net",
      "raw.githubusercontent.com",
      "steamcdn-a.akamaihd.net",
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    ppr: true,
  },
};

module.exports = nextConfig;
