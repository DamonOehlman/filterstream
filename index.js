var matchme = require('matchme');
var through = require('through');

module.exports = function(query, opts) {
  // create the matchme filter
  var matcher = matchme(opts);

  function write(data) {
    matcher.target = data;
    console.log(typeof data);
    if (matcher.query(query).ok) {
      this.queue(data);
    }
  }

  return through(write);
};