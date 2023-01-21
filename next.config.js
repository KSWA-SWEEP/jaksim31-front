module.exports = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['source.unsplash.com', 'objectstorage.kr-central-1.kakaoi.io'],
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