/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    VITE_APP_ID: process.env.VITE_APP_ID,
    OAUTH_SERVER_URL: process.env.OAUTH_SERVER_URL,
    VITE_OAUTH_PORTAL_URL: process.env.VITE_OAUTH_PORTAL_URL,
    OWNER_OPEN_ID: process.env.OWNER_OPEN_ID,
    OWNER_NAME: process.env.OWNER_NAME,
    BUILT_IN_FORGE_API_URL: process.env.BUILT_IN_FORGE_API_URL,
    BUILT_IN_FORGE_API_KEY: process.env.BUILT_IN_FORGE_API_KEY,
    VITE_FRONTEND_FORGE_API_KEY: process.env.VITE_FRONTEND_FORGE_API_KEY,
    VITE_FRONTEND_FORGE_API_URL: process.env.VITE_FRONTEND_FORGE_API_URL,
    VITE_ANALYTICS_ENDPOINT: process.env.VITE_ANALYTICS_ENDPOINT,
    VITE_ANALYTICS_WEBSITE_ID: process.env.VITE_ANALYTICS_WEBSITE_ID,
    VITE_APP_TITLE: process.env.VITE_APP_TITLE,
    VITE_APP_LOGO: process.env.VITE_APP_LOGO,
  },
};

export default nextConfig;
