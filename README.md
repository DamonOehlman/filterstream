# filterstream

Filtering object streams in node using
[matchme](https://github.com/DamonOehlman/matchme).


[![NPM](https://nodei.co/npm/filterstream.png)](https://nodei.co/npm/filterstream/)

[![Build Status](https://travis-ci.org/DamonOehlman/filterstream.png?branch=master)](https://travis-ci.org/DamonOehlman/filterstream)

## Example Usage

```js
var csv = require('binary-csv');
var fs = require('fs');
var filterstream = require('filterstream');

fs.createReadStream(__dirname + '/../test/data/brisbane-parks.csv')
  .pipe(csv({ json: true }))
  .pipe(filterstream('Latitude <= -27.61091533 && Latitude <= -27.6195995'))
  .on('data', function(data) {
    console.log('found matching park: ', data);
  });
```

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
