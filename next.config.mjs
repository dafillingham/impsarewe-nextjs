/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Ensure we are not accidentally forcing a static export
  // by leaving the 'output' key ONLY as 'standalone'.
  images: { unoptimized: true },
};

export default nextConfig;
