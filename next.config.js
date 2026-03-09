/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design/icons'],
  images: {
    domains: ['api.dicebear.com'],
  },
};

module.exports = nextConfig;
