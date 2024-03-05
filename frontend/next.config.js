/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "d2m0dxds81dlzy.cloudfront.net",
      "id.twitch.tv",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };
    return config;
  },
};

module.exports = nextConfig;
