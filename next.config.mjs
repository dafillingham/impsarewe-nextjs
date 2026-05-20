/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Essential for VPS
  images: { unoptimized: true },
};
export default nextConfig;
