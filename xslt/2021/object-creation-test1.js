const SaxonJS = require('saxon-js');

const result = SaxonJS.XPath.evaluate(`
    ixsl:window()
    => ixsl:get('Reflect.construct') 
    => ixsl:apply([ixsl:window() 
    => ixsl:get('Object'), []])
  `, 
  [],
  { namespaceContext : { ixsl : 'http://saxonica.com/ns/interactiveXSLT' } }
);

console.log(result);