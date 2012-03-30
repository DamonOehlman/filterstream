var csv = require('csv'),
    path = require('path'),
    expect = require('expect.js'),
    datapath = path.resolve(__dirname, 'data/brisbane-parks.csv');

describe('unfiltered file checks', function() {
    it('should be able to load the entire file using the csv parser', function(done) {
        var count = 0;
        
        csv()
            .fromPath(datapath, { columns: true })
            .on('data', function(item) {
                count++;
            })
            .on('end', function() {
                expect(count).to.equal(2214);
                done();
            });
    });
});