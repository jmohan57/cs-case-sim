/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "steamcommunity-a.akamaihd.net",
      "raw.githubusercontent.com",
      "steamcdn-a.akamaihd.net"
    ]
  }
};

module.exports = nextConfig;
