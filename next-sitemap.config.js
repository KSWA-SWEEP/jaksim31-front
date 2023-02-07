/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://jaksim31.xyz',
    exclude: ['/404', '/diary/'],
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
            userAgent: '*',
            disallow: ['/404', '/diary/'],
        },
        { 
            userAgent: '*', 
            allow: '/home/' },
      ],
    },
  }