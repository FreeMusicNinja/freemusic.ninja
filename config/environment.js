/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'freemusicninja',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      API_NAMESPACE: '',
      API_CLIENT_ID: process.env.API_CLIENT_ID || 'web',
      API_HOST: '',
    },

    'simple-auth': {
      authorizer: 'simple-auth-authorizer:oauth2-bearer',
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_HOST = process.env.API_URL;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.API_HOST = 'http://api';
    ENV.APP.API_CLIENT_ID = 'client_id';
    ENV['simple-auth'].store = 'simple-auth-session-store:ephemeral';
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'https://api.freemusic.ninja';
  }

  ENV['simple-auth-oauth2'] = {
    serverTokenEndpoint: ENV.APP.API_HOST + '/oauth2/token/?client_id=' + encodeURIComponent(ENV.APP.API_CLIENT_ID),
  };

  ENV['simple-auth'].crossOriginWhitelist = [ENV.APP.API_HOST];

  ENV.contentSecurityPolicy = {
    'connect-src': "'self' data: " + ENV.APP.API_HOST.replace(/^https?:\/\//i, ''),
    'font-src': "'self' data: s3a.amazonaws.com",
  };

  return ENV;
};
