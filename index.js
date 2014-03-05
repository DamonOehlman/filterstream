var matchme = require('matchme');
var through = require('through');

/**
  # filterstream

  Filtering object streams in node using
  [matchme](https://github.com/DamonOehlman/matchme).

  ## Example Usage

  Here's a quick example that I've tweaked from the
  [geonames](https://github.com/DamonOehlman/geonames) importer that I'm
  currently playing around with:

  <<< examples/brisbane-parks.js

**/
module.exports = function(query, opts) {
  // create the matchme filter
  var matcher = matchme(opts);

  return through(function(data) {
    matcher.target = data;
    if (matcher.query(query).ok) {
      this.queue(data);
    }
  });
};