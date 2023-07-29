/** @type {import('next').NextConfig} */
// const nextConfig = {}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://189.90.36.16:3330/:path*',
      },
    ]
  },
}
