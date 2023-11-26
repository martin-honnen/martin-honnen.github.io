importScripts("https://cjrtnc.leaningtech.com/3_20231123_298/cj3loader.js"); //"https://cjrtnc.leaningtech.com/3_20231115_286/cj3loader.js"); //https://cjrtnc.leaningtech.com/3_20231114_284/cj3loader.js"); //"https://cjrtnc.leaningtech.com/3_20231114_282/cj3loader.js"); //("https://cjrtnc.leaningtech.com/3_20231030_252/cj3loader.js");

var lib = null;

var SaxonProcessor = null;

var StringReader = null;

var StringWriter = null;

var StreamSource = null;

var JException = null;

var SaxonApiException = null;

var XdmValue = null;

var XdmAtomicValue = null;

var QName = null;

var XdmFunctionItem = null;

var saxonProcessor = null;

var xsltCompiler = null;

var xpathProcessor = null;

var xqueryCompiler = null;

var docBuilder = null;

var jsonBuilder = null;

var jsonDocFunction = null;

var saxonInitialized = false;

(async () => {
  await cheerpjInit();

  lib = await cheerpjRunLibrary("/app/cheerpj-saxon-worker/saxon-he-11.6.jar");

  console.log('Worker CheerpJ 3 library initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'cheerpj3-load-indicator' });

  JException = await lib.java.lang.Exception;
  
  SaxonProcessor = await lib.net.sf.saxon.s9api.Processor;

  StringReader = await lib.java.io.StringReader;

  StringWriter = await lib.java.io.StringWriter;

  StreamSource = await lib.javax.xml.transform.stream.StreamSource;
  
  SaxonApiException = await lib.net.sf.saxon.s9api.SaxonApiException;
  
  XdmValue = await lib.net.sf.saxon.s9api.XdmValue;
  
  XdmAtomicValue = await lib.net.sf.saxon.s9api.XdmAtomicValue;
  
  QName = await lib.net.sf.saxon.s9api.QName;
  
  XdmFunctionItem = await lib.net.sf.saxon.s9api.XdmFunctionItem;

  saxonProcessor = await new SaxonProcessor(false);

  xpathProcessor = await saxonProcessor.newXPathCompiler();

  docBuilder = await saxonProcessor.newDocumentBuilder();

  jsonBuilder = await saxonProcessor.newJsonBuilder();

  xsltCompiler = await saxonProcessor.newXsltCompiler();

  xqueryCompiler = await saxonProcessor.newXQueryCompiler();
  
  jsonDocFunction = await XdmFunctionItem.getSystemFunction(saxonProcessor, await new QName('http://www.w3.org/2005/xpath-functions', 'json-doc'), 1);

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
  if (task === 'transform-urls') {
    await transformUrls(data.input, data.code, data.inputType);
  }
  else if (task === 'xquery') {
	  await xqueryUrls(data.input, data.code, data.inputType);  
  }
  else if (task === 'xpath') {
	  await xpathUrls(data.input, data.code, data.inputType);  
  }
}
