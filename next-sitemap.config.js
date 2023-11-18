module.exports = {
  siteUrl: process.env.SITE_URL || 'https://explore-defichain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/*?network=*",
      },
    ],
  },
};
