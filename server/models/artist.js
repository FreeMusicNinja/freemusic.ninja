'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Artist Schema
 */
var ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  jamendo_url: String,
  magnatune_url: String,
  fma_url: String,
  homepage_url: String,
}, {toJSON: {virtuals: true}});

/**
 * Validations
 */
var validateURL = function (url) {
  return typeof url === 'string' && url.startsWith('http://');
};

['jamendo_url', 'magnatune_url', 'fma_url', 'homepage_url'].forEach(function(field){
  ArtistSchema.path(field).validate(validateURL, field + ' must be a URL');
});

ArtistSchema.path('name').index();

mongoose.model('Artist', ArtistSchema);
