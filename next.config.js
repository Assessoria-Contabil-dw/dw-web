/** @type {import('next').NextConfig} */
// const nextConfig = {}

module.exports = {
  // async rewrites() {
  //   return [
  //     // {
  //     //   source: '/api/:path*',
  //     //   destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     // },
  //   ]
  // },

  output: "standalone",
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
  async headers() {
    return [
      {
        // matching all API routes
        source: process.env.NEXT_PUBLIC_API_URL + "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
}
