/** @type {import('next').NextConfig} */
// const nextConfig = {}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://189.90.36.16:3330/:path*',
        // destination: 'http://localhost:3330/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'divulgaspca.tse.jus.br',
        port: '',
        pathname: '/assets/partidos/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dfvdw6xvy/image/upload/**',
      },
    ],
  },
}
