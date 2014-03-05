var csv = require('binary-csv');
var fs = require('fs');
var filterstream = require('..');

fs.createReadStream(__dirname + '/../test/data/brisbane-parks.csv')
  .pipe(csv({ json: true }))
  .pipe(filterstream('Latitude <= -27.61091533 && Latitude <= -27.6195995'))
  .on('data', function(data) {
    console.log('found matching park: ', data);
  });