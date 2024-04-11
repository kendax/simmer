/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     // Add rule for SVG files
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });

//     // Check if it's not a server build
//     if (!isServer) {
//       // Provide polyfills or mocks for Node.js core modules
//       config.resolve.fallback = {
//         fs: false,
//         net: false,
//         tls: false,
//         dns: false,
//       };
//     }

//     return config;
//   },
// };

// export default nextConfig;

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheStartUrl: true,
  dynamicStartUrl: true,
  dynamicStartUrlRedirect: '/login', 
  workboxOptions: {
    skipWaiting: true,
  },
});

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add rule for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Check if it's not a server build
    if (!isServer) {
      // Provide polyfills or mocks for Node.js core modules
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }

    return config;
  },
};

export default withPWA(nextConfig);

