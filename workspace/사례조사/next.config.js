/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/etc_ai",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // 개발 환경에서는 basePath 무시
  ...(process.env.NODE_ENV === 'development' && { basePath: '' }),
};

module.exports = nextConfig;
