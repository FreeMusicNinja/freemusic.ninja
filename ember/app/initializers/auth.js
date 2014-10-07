import config from '../config/environment';

export default {
  name:       'auth',
  before:      'django-rest-auth',
  initialize: function() {
    window.ENV = config;
  }
};
