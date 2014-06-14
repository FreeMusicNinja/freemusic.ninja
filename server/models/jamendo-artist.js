'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Jamendo Artist Schema
 */
var ArtistSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  website: String,
  joindate: {
    type: Date,
    required: true,
  },
  image: String,
  shorturl: String,
  shareurl: String,
}, {toJSON: {virtuals: true}});

ArtistSchema.path('name').index();

ArtistSchema.virtual('url').get(function () {
  return this.shareurl;
});
ArtistSchema.virtual('service').get(function () {
  return 'Jamendo';
});

mongoose.model('JamendoArtist', ArtistSchema);
