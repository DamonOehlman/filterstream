var csv = require('binary-csv');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var datapath = path.resolve(__dirname, 'data/brisbane-parks.csv');

test('check unfiltered file load', function(t) {
  var count = 0;

  t.plan(1);

  fs.createReadStream(datapath)
    .pipe(csv({ json: true }))
    .on('data', function(item) {
      count++
    })
    .on('end', function() {
      t.equal(count, 2214);
    });
});