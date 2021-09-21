'use strict'

require('source-map-support').install();
require('ts-node').register();

const createPages = require('./src/createPages');

console.log(createPages);

exports.createPages = createPages;