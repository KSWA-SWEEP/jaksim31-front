module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL+'/:path*',
      },
    ];
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com', 'objectstorage.kr-central-1.kakaoi.io'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}