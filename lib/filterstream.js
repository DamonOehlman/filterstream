var Stream = require('stream').Stream,
    util = require('util'),
    matchme = require('matchme');
    
function FilterStream(query, opts) {
    Stream.call(this);
    
    this.readable = true;
    this.writable = true;
    
    // create the matcher and save the query
    this.matcher = matchme(null, opts);
    this.query = query;
}

util.inherits(FilterStream, Stream);

FilterStream.prototype.end = function() {
    this.emit('end');
};

FilterStream.prototype.write = function(data) {
    if (typeof data == 'object') {
        this.matcher.target = data;
        if (this.matcher.query(this.query).ok) {
            this.emit('data', data);
        }
    }
    else {
        this.emit('data', data);
    }
};

exports = module.exports = function(query) {
    return new FilterStream(query);
};

exports.FilterStream = FilterStream;