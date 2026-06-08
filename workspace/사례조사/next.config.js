/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/etc_ai",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
