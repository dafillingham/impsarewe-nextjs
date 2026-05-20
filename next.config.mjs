/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Change this from 'standalone' to 'export'
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static exports
  },
};

export default nextConfig;
