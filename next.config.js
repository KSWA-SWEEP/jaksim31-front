/** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// }

// module.exports = nextConfig

module.exports = {
  reactStrictMode: false,
  env: {
    CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    REDIRECT_URL: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
  },
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