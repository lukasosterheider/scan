module.exports = {
  siteUrl: process.env.SITE_URL || 'https://explorer.sternberg-partners.de',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{
      userAgent: '*',
      allow: '/',
      disallow: '/*?network=*'
    }]
  }
}
