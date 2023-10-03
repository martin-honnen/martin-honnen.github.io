async function xpath(input, xpathCode, inputType, resultsSelect) {
  if (!saxonInitialized) {
    await initSaxon();
    saxonInitialized = true;
  }
  var contextItem = null;
  if (inputType === 'JSON') {
    contextItem = await cjCall(jsonBuilder, 'parseJson', await cjNew('java.io.StringReader', input));
  }
  else if (inputType === 'XML') {
    contextItem = await cjCall(docBuilder, 'build', await cjNew('javax.xml.transform.stream.StreamSource', await cjNew('java.io.StringReader', input)));
  }	
  var xpathResult = await cjCall(xpathProcessor, 'evaluate', xpathCode, contextItem);
  var stringResult = await cjCall(xpathResult, 'toString');

  var jsStringResult = cjStringJavaToJs(stringResult);

  setDocument(resultEditor, jsStringResult, 'xml');

  writeResult(window.frames['current-result-frame'], jsStringResult);


}