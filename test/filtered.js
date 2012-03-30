var csv = require('csv'),
    filterstream = require('../lib/filterstream'),
    path = require('path'),
    expect = require('expect.js'),
    datapath = path.resolve(__dirname, 'data/brisbane-parks.csv');

describe('filtered checks', function() {
    it('should be able to filter on string properties', function(done) {
        var count = 0;
        
        csv()
            .fromPath(datapath, { columns: true })
            .pipe(filterstream('Suburb == "Ferny Grove"'))
            .on('data', function(item) {
                count++;
            })
            .on('end', function() {
                expect(count).to.equal(19);
                done();
            });
    });
    
    it('should be able to filter on numeric properties', function(done) {
        var count = 0;
        
        csv()
            .fromPath(datapath, { columns: true })
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
                expect(count).to.equal(103);
                done();
            });
    });
});