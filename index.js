var matchme = require('matchme');
var through = require('through');

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