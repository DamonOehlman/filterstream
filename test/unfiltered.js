var csv = require('csv');
var path = require('path');
var test = require('tape');
var datapath = path.resolve(__dirname, 'data/brisbane-parks.csv');

test('check unfiltered file load', function(t) {
  var count = 0;

  t.plan(1);

  csv()
    .from.path(datapath, { columns: true })
    .on('data', function(item) {
      count++
    })
    .on('end', function() {
      t.equal(count, 2214);
    });
});