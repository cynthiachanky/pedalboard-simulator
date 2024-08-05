/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/api/:path*' : '/api/'
      }
    ];
  }
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
