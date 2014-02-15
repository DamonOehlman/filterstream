var csv = require('csv');
var filterstream = require('../');
var path = require('path');
var test = require('tape');
var datapath = path.resolve(__dirname, 'data/brisbane-parks.csv');

test('filter on a string property', function(t) {
  var count = 0;

  t.plan(1);
  
  csv()
    .from.path(datapath, { columns: true })
    .pipe(filterstream('Suburb == "Ferny Grove"'))
    .on('data', function(item) {
      count++;
    })
    .on('end', function() {
      t.equal(count, 19, 'ok');
    });
});

test('filter on numeric properties', function(t) {
  var count = 0;

  t.plan(1);

  csv()
    .from.path(datapath, { columns: true })
    .transform(function(data) {
      data.Latitude = parseFloat(data.Latitude);
      data.Longitude = parseFloat(data.Longitude);
      
      return data;
    })
    .pipe(filterstream('Latitude <= -27.61091533 && Latitude <= -27.6195995'))
    .on('data', function(item) {
      count++;
    })
    .on('end', function() {
      t.equal(count, 103, 'ok');
    });
});