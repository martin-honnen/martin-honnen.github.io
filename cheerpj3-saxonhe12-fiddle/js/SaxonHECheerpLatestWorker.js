importScripts("https://cjrtnc.leaningtech.com/4.2/loader.js"); //"https://cjrtnc.leaningtech.com/3_20250414_1093/cj3loader.js"); //https://cjrtnc.leaningtech.com/3_20250330_890/cj3loader.js");//https://cjrtnc.leaningtech.com/3.1/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241216_574/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241213_572/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3.0/cj3loader.js");

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

const predefinedNamespaces = {
  'map' : 'http://www.w3.org/2005/xpath-functions/map',
  'array' : 'http://www.w3.org/2005/xpath-functions/array',
  'math' : 'http://www.w3.org/2005/xpath-functions/math',
  'err' : 'http://www.w3.org/2005/xqt-errors',
  'xs' : 'http://www.w3.org/2001/XMLSchema'
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

var SaxonLogger = null;

var saxonProcessor = null;

var xsltCompiler = null;

var xpathProcessor = null;

var xqueryCompiler = null;

var docBuilder = null;

var jsonBuilder = null;

var saxonInitialized = false;

(async () => {
  //{"/lt/8/jre/lib/rt.jar":[0,131072,4456448,4849664,5111808,5636096,7995392,8257536,10223616,12451840,13238272,13369344,15073280,15335424,15466496,15597568,15990784,16121856,17170432,17301504,17694720,17825792,18219008,18481152,19267584,19791872,19922944,20578304,20709376,21233664,21364736,21495808,21626880,22806528,22937600,23461888,23592960,26869760],"/lt/8/jre/lib/cheerpj-awt.jar":[0,131072],"/lt/etc/passwd":[0,131072],"/lt/etc/localtime":[],"/lt/8/ext/meta-index":[0,131072],"/lt/8/ext":[],"/lt/8/ext/index.list":[],"/lt/8/ext/sunjce_provider.jar":[],"/lt/8/jre/lib/jsse.jar":[0,131072,786432,917504],"/lt/8/jre/lib/jce.jar":[0,131072],"/lt/8/jre/lib/charsets.jar":[0,131072,1703936,1835008],"/lt/8/jre/lib/resources.jar":[0,131072,917504,1179648],"/lt/8/jre/lib/javaws.jar":[0,131072,1441792,1703936],"/lt/8/lib/security/java.security":[0,131072],"/lt/8/jre/lib/meta-index":[0,131072],"/lt/8/jre/lib":[],"/lt/8/lib/jaxp.properties":[],"/lt/etc/timezone":[],"/lt/8/lib/tzdb.dat":[0,131072]}
  
  await cheerpjInit({version: 8}); //{ preloadResources : {"/lt/8/jre/lib/rt.jar":[0,131072,4456448,4849664,5111808,5636096,7995392,8257536,10223616,12451840,13238272,13369344,15073280,15335424,15466496,15597568,15990784,16121856,17170432,17301504,17694720,17825792,18219008,18481152,19267584,19791872,19922944,20578304,20709376,21233664,21364736,21495808,21626880,22806528,22937600,23461888,23592960,26869760],"/lt/8/jre/lib/cheerpj-awt.jar":[0,131072],"/lt/etc/passwd":[0,131072],"/lt/etc/localtime":[],"/lt/8/ext/meta-index":[0,131072],"/lt/8/ext":[],"/lt/8/ext/index.list":[],"/lt/8/ext/sunjce_provider.jar":[],"/lt/8/jre/lib/jsse.jar":[0,131072,786432,917504],"/lt/8/jre/lib/jce.jar":[0,131072],"/lt/8/jre/lib/charsets.jar":[0,131072,1703936,1835008],"/lt/8/jre/lib/resources.jar":[0,131072,917504,1179648],"/lt/8/jre/lib/javaws.jar":[0,131072,1441792,1703936],"/lt/8/lib/security/java.security":[0,131072],"/lt/8/jre/lib/meta-index":[0,131072],"/lt/8/jre/lib":[],"/lt/8/lib/jaxp.properties":[],"/lt/etc/timezone":[],"/lt/8/lib/tzdb.dat":[0,131072]} });
  //await cheerpjInit({ preloadResources : {"/lt/8/jre/lib/rt.jar":[0,131072,4456448,4849664,5111808,5636096,7995392,8257536,10223616,12451840,13238272,13369344,15073280,15335424,15466496,15597568,15990784,16121856,17170432,17301504,17694720,17825792,18219008,18481152,19267584,19791872,19922944,20578304,20709376,21233664,21364736,21495808,21626880,22806528,22937600,23461888,23592960,26869760],"/lt/8/jre/lib/cheerpj-awt.jar":[0,131072],"/lt/etc/passwd":[0,131072],"/lt/etc/localtime":[],"/lt/8/ext/meta-index":[0,131072],"/lt/8/ext":[],"/lt/8/ext/index.list":[],"/lt/8/ext/sunjce_provider.jar":[],"/lt/8/jre/lib/jsse.jar":[0,131072,786432,917504],"/lt/8/jre/lib/jce.jar":[0,131072],"/lt/8/jre/lib/charsets.jar":[0,131072,1703936,1835008],"/lt/8/jre/lib/resources.jar":[0,131072,917504,1179648],"/lt/8/jre/lib/javaws.jar":[0,131072,1441792,1703936],"/lt/8/lib/security/java.security":[0,131072],"/lt/8/jre/lib/meta-index":[0,131072],"/lt/8/jre/lib":[],"/lt/8/lib/jaxp.properties":[],"/lt/etc/timezone":[],"/lt/8/lib/tzdb.dat":[0,131072]} });

  lib = await cheerpjRunLibrary("/app/cheerpj3-saxonhe12-fiddle/Saxon-HE-12.9.jar:/app/cheerpj3-saxonhe12-fiddle/Cheerp3Helpers.jar");
  
  console.log('Worker CheerpJ 4.2 library initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'cheerpj3-load-indicator' });

  JException = await lib.java.lang.Exception;
  
  SaxonProcessor = await lib.net.sf.saxon.s9api.Processor;
  
  SaxonHelpers = await lib.net.liberty_development.cheerp3Helpers.SaxonHelpers;

  StringReader = await lib.java.io.StringReader;

  StringWriter = await lib.java.io.StringWriter;

  StreamSource = await lib.javax.xml.transform.stream.StreamSource;

  URI = await lib.java.net.URI;
  
  SaxonApiException = await lib.net.sf.saxon.s9api.SaxonApiException;

  SaxonLogger = await lib.net.sf.saxon.lib.StandardLogger;

  saxonProcessor = await new SaxonProcessor(false);
  
  await SaxonHelpers.setProcessor(saxonProcessor);

  xpathProcessor = await saxonProcessor.newXPathCompiler();

  for (const [prefix, namespace] of Object.entries(predefinedNamespaces)) {
    await xpathProcessor.declareNamespace(prefix, namespace);
  }

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
    await transform(data.input, data.code, data.inputType, data.inputBaseURI, data.xsltBaseURI);
  }
  else if (task === 'xquery') {
    await xquery(data.input, data.code, data.inputType, data.inputBaseURI, data.xqueryBaseURI);
  }
  else if (task === 'xpath') {
    await xpath(data.input, data.code, data.inputType, data.inputBaseURI, data.xpathBaseURI);
  }
}
