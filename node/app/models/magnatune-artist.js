'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Magnatune Artist Schema
 */
var ArtistSchema = new Schema({
  id: {
    type: String,
  },
  artist: {
    type: String,
    required: true,
  },
  description: String,
  bandphoto: String,
  homepage: String,
  city: String,
  state: String,
  country: String,
  bio: String,
}, {toJSON: {virtuals: true}});


ArtistSchema.path('artist').index();

ArtistSchema.virtual('name').get(function () {
  return this.artist;
});
ArtistSchema.virtual('url').get(function () {
  return 'http://magnatune.com/artists/' + this.homepage;
});
ArtistSchema.virtual('service').get(function () {
  return 'Magnatune';
});

mongoose.model('MagnatuneArtist', ArtistSchema);
