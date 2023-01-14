const path = require('path');

var urlModule = require('url');

const baseURI = urlModule.pathToFileURL(path.join(path.resolve('.'), 'foo.xml'));

console.log(`baseURI: ${baseURI.href}`);

const SaxonJS = require('saxon-js');

var options = {
  'stylesheetLocation' : 'sheet1.sef.json',
  'sourceLocation' : 'input1.xml',
  'destination' : 'serialized',
  'baseOutputURI' : baseURI.href
};

SaxonJS.transform(options); //SaxonJS.transform(options, 'sync');

console.log(options.principalResult);

for (var uri in options.resultDocuments) {
  console.log(uri, options.resultDocuments[uri]);
}