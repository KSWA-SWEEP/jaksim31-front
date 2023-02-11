/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://jaksim31.xyz',
    exclude: ['/404'],
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
            userAgent: '*',
            disallow: ['/404'],
        },
        { 
            userAgent: '*', 
            allow: '/home/' },
      ],
    },
  }