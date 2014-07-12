/* global require */

var express = require('express');
var app = express();
app.listen(3900, function() {
    console.log('Listening on port 3900');
});

exports = module.exports = app;
