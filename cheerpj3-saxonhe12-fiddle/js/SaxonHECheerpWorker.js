importScripts('https://cjrtnc.leaningtech.com/3.0rc2/cj3loader.js');

var filetypes = {
  '.htm': 'html',
  '.html': 'html',
  '.xml': 'xml',
  '.xsd': 'xml',
  '.xsl': 'xml',
  '.xslt': 'xml',
  '.xhtml' : 'xml',
  '.xquery' : 'xquery',
  '.xq' : 'xquery',
  '.json' : 'json',
  '.txt' : 'text',
  '.text' : 'text'
};

var lib = null;

var SaxonProcessor = null;

var SaxonHelpers = null;

var StringReader = null;

var StringWriter = null;

var StreamSource = null;

var URI = null;

var JException = null;

var SaxonApiException = null;

var saxonProcessor = null;

var xsltCompiler = null;

var xpathProcessor = null;

var xqueryCompiler = null;

var docBuilder = null;

var jsonBuilder = null;

var saxonInitialized = false;

(async () => {
  await cheerpjInit();

  //lib = await cheerpjRunLibrary("/app/saxon-he-12.4.jar:/app/Cheerp3Helpers.jar");
  lib = await cheerpjRunLibrary("/app/cheerpj3-saxonhe12-fiddle/saxon-he-12.4.jar:/app/cheerpj3-saxonhe12-fiddle/Cheerp3Helpers.jar");
  
  console.log('Worker CheerpJ 3 library initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'cheerpj3-load-indicator' });

  JException = await lib.java.lang.Exception;
  
  SaxonProcessor = await lib.net.sf.saxon.s9api.Processor;
  
  SaxonHelpers = await lib.net.liberty_development.cheerp3Helpers.SaxonHelpers;

  StringReader = await lib.java.io.StringReader;

  StringWriter = await lib.java.io.StringWriter;

  StreamSource = await lib.javax.xml.transform.stream.StreamSource;

  URI = await lib.java.net.URI;
  
  SaxonApiException = await lib.net.sf.saxon.s9api.SaxonApiException;

  saxonProcessor = await new SaxonProcessor(false);
  
  await SaxonHelpers.setProcessor(saxonProcessor);

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
