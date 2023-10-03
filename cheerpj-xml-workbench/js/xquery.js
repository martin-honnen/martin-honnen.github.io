async function xquery(input, xquery, inputType, resultsSelect) {

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

  var xqueryExecutable = await cjCall(xqueryCompiler, 'compile', cjStringJsToJava(xquery));

  var xquerySelector = await cjCall(xqueryExecutable, 'load');

  await cjCall(xquerySelector, 'setContextItem', contextItem);

  var stringWriter = await cjNew('java.io.StringWriter');
 
  var destination = await cjCall(saxonProcessor, 'newSerializer');
  await cjCall(destination, 'setOutputWriter', stringWriter);
	
  await cjCall(xquerySelector, 'run', destination);

  var stringResult = await cjCall(stringWriter, 'toString');

  var jsStringResult = cjStringJavaToJs(stringResult);

  setDocument(resultEditor, jsStringResult, 'xml');

  writeResult(window.frames['current-result-frame'], jsStringResult);
    
}