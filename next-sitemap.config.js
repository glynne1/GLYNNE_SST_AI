/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://glynneai.com', // tu dominio
    generateRobotsTxt: true,         // genera automáticamente robots.txt
    sitemapSize: 5000,                // máximo de URLs por sitemap
    changefreq: 'weekly',             // frecuencia general
    priority: 0.7,                    // prioridad general
    additionalPaths: async (config) => [
      { loc: '/appInfo', changefreq: 'monthly', priority: 0.8 },
      { loc: '/politicas', changefreq: 'monthly', priority: 0.7 },
      { loc: '/muroRed', changefreq: 'monthly', priority: 0.9 },
    ],
  };
  