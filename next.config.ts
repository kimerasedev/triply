/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // 급한 배포 때만 사용하고 완료되면 false로
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
