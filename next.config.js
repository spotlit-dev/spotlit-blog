//const withPlugins = require('next-compose-plugins');

const nextSettings = {
  webpack5: true,
  trailingSlash: false,
  env: {
    title: 'Spotlit',
    titleDescription: 'Find your new favorite spots. Faster.',
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fr'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
};

module.exports = nextSettings;
