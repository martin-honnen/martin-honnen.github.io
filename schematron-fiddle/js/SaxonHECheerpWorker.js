importScripts("https://cjrtnc.leaningtech.com/4.2/loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3.0/cj3loader.js");//importScripts('https://cjrtnc.leaningtech.com/3.0rc2/cj3loader.js');

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

var HashMap = null;

var URI = null;

var JException = null;

var SaxonApiException = null;

var SaxonLogger = null;

var saxonProcessor = null;

var xsltCompiler = null;

var XdmAtomicValue = null;

var QName = null;

var saxonInitialized = false;

(async () => {
  //{"/lt/8/rt.jar":[0,131072,4456448,4849664,5111808,5636096,7995392,8257536,10223616,12451840,13238272,13369344,15073280,15335424,15466496,15597568,15990784,16121856,17170432,17301504,17694720,17825792,18219008,18481152,19267584,19791872,19922944,20578304,20709376,21233664,21364736,21495808,21626880,22806528,22937600,23461888,23592960,26869760],"/lt/8/cheerpj-awt.jar":[0,131072],"/lt/etc/passwd":[0,131072],"/lt/etc/localtime":[],"/lt/8/ext/meta-index":[0,131072],"/lt/8/ext":[],"/lt/8/ext/index.list":[],"/lt/8/ext/sunjce_provider.jar":[],"/lt/8/jsse.jar":[0,131072,786432,917504],"/lt/8/jce.jar":[0,131072],"/lt/8/charsets.jar":[0,131072,1703936,1835008],"/lt/8/resources.jar":[0,131072,917504,1179648],"/lt/8/javaws.jar":[0,131072,1441792,1703936],"/lt/8/lib/security/java.security":[0,131072],"/lt/8/meta-index":[0,131072],"/lt/8/lib/jaxp.properties":[],"/lt/etc/timezone":[],"/lt/8/lib/tzdb.dat":[0,131072]}
  
  //await cheerpjInit();
  await cheerpjInit(); //{ preloadResources : {"/lt/8/rt.jar":[0,131072,4456448,4849664,5111808,5636096,7995392,8257536,10223616,12451840,13238272,13369344,15073280,15335424,15466496,15597568,15990784,16121856,17170432,17301504,17694720,17825792,18219008,18481152,19267584,19791872,19922944,20578304,20709376,21233664,21364736,21495808,21626880,22806528,22937600,23461888,23592960,26869760],"/lt/8/cheerpj-awt.jar":[0,131072],"/lt/etc/passwd":[0,131072],"/lt/etc/localtime":[],"/lt/8/ext/meta-index":[0,131072],"/lt/8/ext":[],"/lt/8/ext/index.list":[],"/lt/8/ext/sunjce_provider.jar":[],"/lt/8/jsse.jar":[0,131072,786432,917504],"/lt/8/jce.jar":[0,131072],"/lt/8/charsets.jar":[0,131072,1703936,1835008],"/lt/8/resources.jar":[0,131072,917504,1179648],"/lt/8/javaws.jar":[0,131072,1441792,1703936],"/lt/8/lib/security/java.security":[0,131072],"/lt/8/meta-index":[0,131072],"/lt/8/lib/jaxp.properties":[],"/lt/etc/timezone":[],"/lt/8/lib/tzdb.dat":[0,131072]} });

  //lib = await cheerpjRunLibrary("/app/saxon-he-12.4.jar:/app/Cheerp3Helpers.jar");
  lib = await cheerpjRunLibrary("/app/schematron-fiddle/saxon-he-12.7.jar:/app/schematron-fiddle/lib/xmlresolver-5.3.3.jar:/app/schematron-fiddle/Cheerp3Helpers.jar");
  
  console.log('Worker CheerpJ library initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'cheerpj-load-indicator' });

  JException = await lib.java.lang.Exception;

  HashMap = await lib.java.util.HashMap;
  
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

  docBuilder = await saxonProcessor.newDocumentBuilder();

  xsltCompiler = await saxonProcessor.newXsltCompiler();

  XdmAtomicValue = await lib.net.sf.saxon.s9api.XdmAtomicValue;

  QName = await lib.net.sf.saxon.s9api.QName;

  saxonInitialized = true;

  importScripts("validate-cheerpj-saxonjhe-async.js");

  console.log('Worker Saxon initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'saxon-load-indicator' });

})();

onmessage = async (e) => {
  var task = e.data.task;
  var data = e.data.data;
  if (task === 'schematron') {
    await schematronValidate(data.input, data.schematron, data.schxsltVersion);
  }
}
