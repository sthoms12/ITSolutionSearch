/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // This is important for Cloudflare Pages
    runtime: 'edge',
  }
}

module.exports = nextConfig
