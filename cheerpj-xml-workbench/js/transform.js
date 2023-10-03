async function transform(input, xslt, inputType, resultsSelect) {

  if (!saxonInitialized) {
    await initSaxon();
    saxonInitialized = true;
  }

  var contextItem = null;

  var xsltExecutable = await cjCall(xsltCompiler, 'compile', await cjNew('javax.xml.transform.stream.StreamSource', await cjNew('java.io.StringReader', xslt)));

  var xslt30Transformer = await cjCall(xsltExecutable, 'load30');


  if (inputType === 'JSON') {
    contextItem = await cjCall(jsonBuilder, 'parseJson', await cjNew('java.io.StringReader', input));
  }
  else if (inputType === 'XML') {
    contextItem = await cjCall(docBuilder, 'build', await cjNew('javax.xml.transform.stream.StreamSource', await cjNew('java.io.StringReader', input)));
  }

  if (contextItem !== null) {
    await cjCall(xslt30Transformer, 'setGlobalContextItem', contextItem);
  }

  var stringWriter = await cjNew('java.io.StringWriter');
 
  var destination = await cjCall(xslt30Transformer, 'newSerializer');
  await cjCall(destination, 'setOutputWriter', stringWriter);

  if (contextItem === null) {
    var callTemplateMethod = await cjResolveCall("net.sf.saxon.s9api.Xslt30Transformer", "callTemplate", ["net.sf.saxon.s9api.QName", "net.sf.saxon.s9api.Destination"]);

    callTemplateMethod(xslt30Transformer, null, destination);
  }
  else {
	
    var applyTemplatesMethod = await cjResolveCall("net.sf.saxon.s9api.Xslt30Transformer", "applyTemplates", ["net.sf.saxon.s9api.XdmValue", "net.sf.saxon.s9api.Destination"]);

    //cjCall(xslt30Transformer, applyTemplatesMethod, contextItem, destination);

    applyTemplatesMethod(xslt30Transformer, contextItem, destination);
  }

  var stringResult = await cjCall(stringWriter, 'toString');

  var jsStringResult = cjStringJavaToJs(stringResult);

  setDocument(resultEditor, jsStringResult, 'xml');

  writeResult(window.frames['current-result-frame'], jsStringResult);



}