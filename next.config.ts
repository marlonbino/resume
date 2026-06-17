import type { NextConfig } from 'next';
import dotenv from 'dotenv';

// Load .env into process.env (dotenv.populate is used internally to inject)
dotenv.config({ path: '.env', override: true });

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: [],
  allowedDevOrigins: [
    "**.*.*",
  ],
};

export default nextConfig;

