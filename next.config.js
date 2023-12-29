/** @type {import('next').NextConfig} */
// const nextConfig = {}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: `${process.env.NEXT_API_URL}/:path*`,
        destination: `${process.env.NEXT_API_URL_LOCALHOST}/:path*`,
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
