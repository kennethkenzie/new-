import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'ik.imagekit.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/67mog36hf/Labrezi/**',
      },
    ],

    minimumCacheTTL: 60,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
  optimizeCss: true,
   scrollRestoration: true,
  },
  
};


export default withFlowbiteReact(nextConfig);



