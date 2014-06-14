#!/usr/bin/env node

'use strict';

require('../server/db');
var Q = require('q'),
    Artist = require('mongoose').model('Artist'),
    MagnatuneArtist = require('mongoose').model('MagnatuneArtist'),
    JamendoArtist = require('mongoose').model('JamendoArtist'),
    promises = [];

function updateArtist(artistData, urlField) {
  var conditions = {name: artistData.name},
      update = {},
      options = {upsert: true},
      findArtistAndUpdate = Q.denodeify(Artist.findOneAndUpdate.bind(Artist));
  update[urlField] = artistData.url;
  return findArtistAndUpdate(conditions, update, options);
}

function updateAllArtists(model, urlField) {
  return Q.denodeify(model.find.bind(model))({}).then(function (results) {
    var queries = results.map(function (artist) {
      return updateArtist(artist, urlField);
    });
    return Q.all(queries).then(function (results) {
      console.log("Created/updated " + results.length + " artists.");
    });
  });
}

promises.push(updateAllArtists(JamendoArtist, 'jamendo_url'));

promises.push(updateAllArtists(MagnatuneArtist, 'magnatune_url'));

Q.all(promises).then(process.exit);
