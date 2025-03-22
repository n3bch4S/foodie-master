/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ hostname: "*.ufs.sh" }] },
  reactStrictMode: false,
};

module.exports = nextConfig;
