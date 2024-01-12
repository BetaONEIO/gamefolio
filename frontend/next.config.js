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
};

module.exports = nextConfig;
