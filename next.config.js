/** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// }

// module.exports = nextConfig

module.exports = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['source.unsplash.com']
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