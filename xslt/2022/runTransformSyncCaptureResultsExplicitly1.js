const path = require('path');

var urlModule = require('url');

const baseURI = urlModule.pathToFileURL(path.join(path.resolve('.'), 'foo.xml'));

console.log(`baseURI: ${baseURI.href}`);

const SaxonJS = require('saxon-js');

var options = {
  'stylesheetLocation' : 'sheet1.sef.json',
  'sourceLocation' : 'input1.xml',
  'destination' : 'serialized',
  'baseOutputURI' : baseURI.href,
  'deliverResultDocument': function(uri) {
     return {
       'destination' : 'serialized',
       'save' : function(resultUri, result, encoding) {
          console.log(resultUri, result);
        }
     };
   }
};

SaxonJS.transform(options); //SaxonJS.transform(options, 'sync');

console.log(options.principalResult);
