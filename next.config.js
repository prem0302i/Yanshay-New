/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['konva'],
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
