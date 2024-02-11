/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-5bde1ae25a174b0582630043fa783879.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },}

module.exports = nextConfig
