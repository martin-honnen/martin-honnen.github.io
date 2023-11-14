importScripts("https://cjrtnc.leaningtech.com/3_20231114_284/cj3loader.js"); //"https://cjrtnc.leaningtech.com/3_20231114_282/cj3loader.js"); //("https://cjrtnc.leaningtech.com/3_20231030_252/cj3loader.js");

var lib = null;

var SaxonProcessor = null;

var StringReader = null;

var StringWriter = null;

var StreamSource = null;

var saxonProcessor = null;

var xsltCompiler = null;

var xpathProcessor = null;

var xqueryCompiler = null;

var docBuilder = null;

var jsonBuilder = null;

var saxonInitialized = false;

(async () => {
  await cheerpjInit();

  lib = await cheerpjRunLibrary("/app/cheerpj-saxon-worker/saxon-he-11.6.jar");

  console.log('Worker CheerpJ 3 library initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'cheerpj3-load-indicator' });

  SaxonProcessor = await lib.net.sf.saxon.s9api.Processor;

  StringReader = await lib.java.io.StringReader;

  StringWriter = await lib.java.io.StringWriter;

  StreamSource = await lib.javax.xml.transform.stream.StreamSource;

  saxonProcessor = await new SaxonProcessor(false);

  xpathProcessor = await saxonProcessor.newXPathCompiler();

  docBuilder = await saxonProcessor.newDocumentBuilder();

  jsonBuilder = await saxonProcessor.newJsonBuilder();

  xsltCompiler = await saxonProcessor.newXsltCompiler();

  xqueryCompiler = await saxonProcessor.newXQueryCompiler();

  saxonInitialized = true;

  importScripts("transform-async.js");
  
  importScripts("xquery-async.js");

  importScripts("xpath-async.js");

  console.log('Worker Saxon initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'saxon-load-indicator' });

})();

onmessage = async (e) => {
  var task = e.data.task;
  var data = e.data.data;
  if (task === 'transform') {
    await transform(data.input, data.code, data.inputType);
  }
  else if (task === 'xquery') {
	await xquery(data.input, data.code, data.inputType);  
  }
  else if (task === 'xpath') {
	await xpath(data.input, data.code, data.inputType);  
  }
}
