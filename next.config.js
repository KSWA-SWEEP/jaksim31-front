module.exports = {
  reactStrictMode: false,
  compress: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/kic-api-auth',
        destination: process.env.NEXT_PUBLIC_KAKAO_API_AUTH_URL,
      },
      {
        source: '/kic-upload/:path*',
        destination: process.env.NEXT_PUBLIC_KAKAO_FILE_UPLOAD_URL+'/:path*',
      },
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL+'/api/:path*',
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
    domains: ['source.unsplash.com', 'images.unsplash.com', 'objectstorage.kr-central-1.kakaoi.io', 'k.kakaocdn.net'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  // compiler: {
  //   reactRemoveProperties: { properties: ['^data-testid$'] },
  // },
}