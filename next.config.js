/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "img.clerk.com",
      "subdomain",
      "files.stripe.com",
      "io9y7kt0tw.ufs.sh",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
