var csv = require('binary-csv');
var filterstream = require('../');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var datapath = path.resolve(__dirname, 'data/brisbane-parks.csv');
var through = require('through');

test('filter on a string property', function(t) {
  var count = 0;

  t.plan(1);
  
  fs.createReadStream(datapath)
    .pipe(csv({ json: true }))
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

  fs.createReadStream(datapath)
    .pipe(csv({ json: true }))
    .pipe(through(function(data) {
      data.Latitude = parseFloat(data.Latitude);
      data.Longitude = parseFloat(data.Longitude);
      
      this.queue(data);
    }))
    .pipe(filterstream('Latitude <= -27.61091533 && Latitude <= -27.6195995'))
    .on('data', function(item) {
      count++;
    })
    .on('end', function() {
      t.equal(count, 103, 'ok');
    });
});