importScripts("https://cjrtnc.leaningtech.com/4.2/loader.js");//importScripts("https://cjrtnc.leaningtech.com/3.1/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3.0/cj3loader.js");//importScripts('https://cjrtnc.leaningtech.com/3_20231211_315/cj3loader.js'); //'https://cjrtnc.leaningtech.com/3_20231211_314/cj3loader.js'); //'https://cjrtnc.leaningtech.com/3_20231202_306/cj3loader.js'); //'https://cjrtnc.leaningtech.com/3.0rc2/cj3loader.js');

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

var TransformerFactoryClass = null;

var TransformerFactory = null;

var TransformerImpl = null;

var StringReader = null;

var StringWriter = null;

var StreamSource = null;

var StreamResult = null;

var PrintWriter = null;

var URI = null;

var JException = null;

var JTransformerException = null;

var ErrorListenerImplementationClass = null;

var JTransformerConfigurationException = null;

var JSAXParseException = null;

var docBuilder = null;

var xalanInitialized = false;

(async () => {
  await cheerpjInit();

  //lib = await cheerpjRunLibrary("/app/cheerpj3-xalan-xslt3/xalan.jar:/app/cheerpj3-xalan-xslt3/serializer.jar:/app/cheerpj3-xalan-xslt3/lib/json-20240303.jar:/app/cheerpj3-xalan-xslt3/CheerpJaxpHelpers.jar:/app/cheerpj3-xalan-xslt3/lib/bcel-6.7.0.jar:/app/cheerpj3-xalan-xslt3/lib/brazil-2.1.jar:/app/cheerpj3-xalan-xslt3/lib/bsf.jar:/app/cheerpj3-xalan-xslt3/lib/commons-logging-1.2.jar:/app/cheerpj3-xalan-xslt3/lib/javaee-api-5.0-2.jar:/app/cheerpj3-xalan-xslt3/lib/javaee-api-5.0-2.jar:/app/cheerpj3-xalan-xslt3/lib/regexp.jar:/app/cheerpj3-xalan-xslt3/lib/rhino-1.7.14.jar:/app/cheerpj3-xalan-xslt3/lib/runtime.jar:/app/cheerpj3-xalan-xslt3/lib/servlet-api-2.5.jar:/app/cheerpj3-xalan-xslt3/lib/xpath31_types.jar:/app/cheerpj3-xalan-xslt3/lib/endorsed/xercesImpl.jar:/app/cheerpj3-xalan-xslt3/lib/endorsed/xml-apis.jar");  
  //lib = await cheerpjRunLibrary("/app/xalan.jar:/app/serializer.jar:/app/CheerpJaxpHelpers.jar:/app/lib/bcel-6.7.0.jar:/app/lib/brazil-2.1.jar:/app/lib/bsf.jar:/app/lib/commons-logging-1.2.jar:/app/lib/javaee-api-5.0-2.jar:/app/lib/javaee-api-5.0-2.jar:/app/lib/regexp.jar:/app/lib/rhino-1.7.14.jar:/app/lib/runtime.jar:/app/lib/servlet-api-2.5.jar:/app/lib/xpath31_types.jar:/app/lib/endorsed/xercesImpl.jar:/app/lib/endorsed/xml-apis.jar");
  lib = await cheerpjRunLibrary("/app/cheerpj3-xalan-xslt3/xalan-java-3.0.1-SNAPSHOT.jar:/app/cheerpj3-xalan-xslt3/xalan-java-xpath31_types-0.1.jar:/app/cheerpj3-xalan-xslt3/CheerpJaxpHelpers.jar:/app/cheerpj3-xalan-xslt3/lib/json-20240303.jar:/app/cheerpj3-xalan-xslt3/lib/rhino-1.7.14.jar:/app/cheerpj3-xalan-xslt3/lib/bcel-6.7.0.jar:/app/cheerpj3-xalan-xslt3/lib/commons-logging-1.2.jar:/app/cheerpj3-xalan-xslt3/lib/xpath31_types-1.0.jar:/app/cheerpj3-xalan-xslt3/lib/bsf-1.0.jar:/app/cheerpj3-xalan-xslt3/lib/jlex-1.0.jar:/app/cheerpj3-xalan-xslt3/lib/java_cup-1.0.jar:/app/cheerpj3-xalan-xslt3/lib/cup_runtime-1.0.jar:/app/cheerpj3-xalan-xslt3/lib/xercesImpl-2.12.3.jar:/app/cheerpj3-xalan-xslt3/lib/xml-apis-1.4.02.jar");

  console.log('Worker CheerpJ library initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'cheerpj3-load-indicator' });

  JException = await lib.java.lang.Exception;
  
  JTransformerException = await lib.javax.xml.transform.TransformerException;
  
  JTransformerConfigurationException = await lib.javax.xml.transform.TransformerConfigurationException;
  
  JSAXParseException = await lib.org.xml.sax.SAXParseException;
  
  TransformerFactoryClass = await lib.org.apache.xalan.processor.XSL3TransformerFactoryImpl; //lib.javax.xml.transform.TransformerFactory;
  
  TransformerFactory = await new TransformerFactoryClass(); //lib.org.apache.xalan.processor.XSL3TransformerFactoryImpl; //await TransformerFactoryClass.newInstance();

  TransformerImpl = await TransformerFactory.newTransformer();//lib.org.apache.xalan.transformer.TransformerImpl;
  
  ErrorListenerImplementationClass = await lib.org.example.ErrorListenerHelper;
  
  //SaxonHelpers = await lib.net.liberty_development.cheerp3Helpers.SaxonHelpers;

  StringReader = await lib.java.io.StringReader;

  StringWriter = await lib.java.io.StringWriter;

  StreamSource = await lib.javax.xml.transform.stream.StreamSource;
  
  StreamResult = await lib.javax.xml.transform.stream.StreamResult;
  
  PrintWriter = await lib.java.io.PrintWriter;
  
  URI = await lib.java.net.URI;

  xalanInitialized = true;

  importScripts("transform-async.js");
  
  //importScripts("xquery-async.js");

  //importScripts("xpath-async.js");

  console.log('Worker Xalan initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'xalan-load-indicator' });

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
