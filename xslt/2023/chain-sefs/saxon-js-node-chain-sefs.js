const SaxonJS = require('saxon-js');

var inputXml = 'sample1.xml';

var xsltSefs = ['sheet1.xsl.sef.json', 'sheet2.xsl.sef.json', 'sheet3.xsl.sef.json', 'sheet4.xsl.sef.json'];

const main = async () => {

  const firstResult = await SaxonJS.transform({ 
   stylesheetLocation: xsltSefs[0], 
   sourceLocation: inputXml, 
   destination: 'application' 
   }, 
   'async'
  );

  var sourceNode = firstResult.principalResult;

  //console.log('first result', SaxonJS.serialize(sourceNode, { 'indent': true }));

  for (let i = 1; i < xsltSefs.length; i++) {
    var result = await SaxonJS.transform({ 
        stylesheetLocation: xsltSefs[i], 
        initialSelection: sourceNode,
        destination: 'application' 
      }, 
      'async'
    );
    sourceNode = result.principalResult; 
    //console.log('result', i, SaxonJS.serialize(sourceNode, { 'indent': true }));
  }

  console.log(SaxonJS.serialize(sourceNode, { 'indent': true }));

};

main();

