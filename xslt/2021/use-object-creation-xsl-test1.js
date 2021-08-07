const SaxonJS = require('saxon-js');

const result = SaxonJS.transform(
  {
    stylesheetLocation : 'object-creation-test1.xsl.sef',
    destination: 'raw'    
  },
  'sync'
);

console.log(result.principalResult);