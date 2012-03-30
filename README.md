# filterstream

Filtering object streams in node using [matchme](https://github.com/DamonOehlman/matchme).

## Installation

A very early version of filterstream is available as a npm package:

```
npm install filterstream
```

## Example Usage

Here's a quick example that I've tweaked from the [geonames](https://github.com/DamonOehlman/geonames) importer that I'm currently playing around with:

```js
var geonames = require('geonames'),
    testItems = [];

geonames
    .read('countries/BV.txt'))
    .pipe(filterstream('featureClass == A'))
    .on('data', function(item) {
        testItems.push(item);
    })
    .on('end', function() {
        console.log(testItems);
    });
```