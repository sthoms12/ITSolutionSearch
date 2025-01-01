/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Add this line for static export
  images: {
    unoptimized: true,  // Required for static export
  },
}

module.exports = nextConfig
