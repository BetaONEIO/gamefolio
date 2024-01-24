/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "gamefolio-uploads.s3.eu-west-2.amazonaws.com",
      "id.twitch.tv",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };
    return config;
  },
};

module.exports = nextConfig;
