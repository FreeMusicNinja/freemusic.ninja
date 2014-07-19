'use strict';

var request     = require('request-promise'),
    api_key     = require('../config/config.js').echonest.api_key,
    querystring = require('querystring');

var apiPrefix = 'http://developer.echonest.com/api/v4/';

var getSimilar = function (artistName) {
  var uri, apiQuery;

  apiQuery = {api_key: api_key, results: 100, name: artistName};
  uri = apiPrefix + 'artist/similar?' + querystring.stringify(apiQuery);

  return request({
    uri: uri,
    method: 'GET',
    transform: function (body) {
      var data = JSON.parse(body);
      return data.response.artists.map(function (artist) {
        return artist.name;
      });
    }
  });

};

exports.getSimilar = getSimilar;
