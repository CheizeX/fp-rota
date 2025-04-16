import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    '@fichap-team/fichapui',
    '@fichap-team/fichapui/theme',
    '@heroui/dom-animation',
    '@heroui/theme'
  ],
};

export default nextConfig;
