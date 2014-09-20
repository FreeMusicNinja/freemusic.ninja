/* global exports */
(function(exports){
  'use strict';

  exports.User = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'User',
    description: 'represents a user',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format : 'email',
        maxLength: 50,
      },
      password: {
        type: 'string',
        maxLength: 100,
      },
    },
    required: ['email', 'password'],
  };

})(typeof exports === 'undefined'? this['mymodule']={}: exports);
