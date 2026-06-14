/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow importing JSON files as modules
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
    };
    return config;
  },
};

export default nextConfig;
