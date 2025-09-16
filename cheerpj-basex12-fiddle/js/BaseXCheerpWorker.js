importScripts("https://cjrtnc.leaningtech.com/4.2/loader.js"); //https://cjrtnc.leaningtech.com/20250602_2449/loader.js"); //https://cjrtnc.leaningtech.com/4.1/loader.js"); //https://cjrtnc.leaningtech.com/20250526_2416/loader.js"); //"https://cjrtnc.leaningtech.com/20250526_2407/loader.js"); //"https://cjrtnc.leaningtech.com/20250522_2392/loader.js");//"https://cjrtnc.leaningtech.com/3_20250414_1093/cj3loader.js");//"https://cjrtnc.leaningtech.com/3_20250319_724/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20250116_577/cj3loader.js"); //"https://cjrtnc.leaningtech.com/3_20250113_576/cj3loader.js");//importScripts('https://cjrtnc.leaningtech.com/3.0rc2/cj3loader.js');

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

var Context = null;

var QueryProcessor = null;

var QueryException = null;

var Value = null;

var Iter = null;

var Serializer = null;

var OutputSerializer = null;

var SerializerOptions = null;

var BaseX12Helper = null;

var StringReader = null;

var StringWriter = null;

var StreamSource = null;

var ByteArrayOutputStream = null;

var URI = null;

var JException = null;

var basexInitialized = false;

var context = null;

var queryProcessor = null;

(async () => {
  //{"/lt/8/rt.jar":[0,131072,4456448,4849664,5111808,5636096,7995392,8257536,10223616,12451840,13238272,13369344,15073280,15335424,15466496,15597568,15990784,16121856,17170432,17301504,17694720,17825792,18219008,18481152,19267584,19791872,19922944,20578304,20709376,21233664,21364736,21495808,21626880,22806528,22937600,23461888,23592960,26869760],"/lt/8/cheerpj-awt.jar":[0,131072],"/lt/etc/passwd":[0,131072],"/lt/etc/localtime":[],"/lt/8/ext/meta-index":[0,131072],"/lt/8/ext":[],"/lt/8/ext/index.list":[],"/lt/8/ext/sunjce_provider.jar":[],"/lt/8/jsse.jar":[0,131072,786432,917504],"/lt/8/jce.jar":[0,131072],"/lt/8/charsets.jar":[0,131072,1703936,1835008],"/lt/8/resources.jar":[0,131072,917504,1179648],"/lt/8/javaws.jar":[0,131072,1441792,1703936],"/lt/8/lib/security/java.security":[0,131072],"/lt/8/meta-index":[0,131072],"/lt/8/lib/jaxp.properties":[],"/lt/etc/timezone":[],"/lt/8/lib/tzdb.dat":[0,131072]}
  
  //await cheerpjInit();
  await cheerpjInit({version:17}); //{ preloadResources : {"/lt/8/rt.jar":[0,131072,4456448,4849664,5111808,5636096,7995392,8257536,10223616,12451840,13238272,13369344,15073280,15335424,15466496,15597568,15990784,16121856,17170432,17301504,17694720,17825792,18219008,18481152,19267584,19791872,19922944,20578304,20709376,21233664,21364736,21495808,21626880,22806528,22937600,23461888,23592960,26869760],"/lt/8/cheerpj-awt.jar":[0,131072],"/lt/etc/passwd":[0,131072],"/lt/etc/localtime":[],"/lt/8/ext/meta-index":[0,131072],"/lt/8/ext":[],"/lt/8/ext/index.list":[],"/lt/8/ext/sunjce_provider.jar":[],"/lt/8/jsse.jar":[0,131072,786432,917504],"/lt/8/jce.jar":[0,131072],"/lt/8/charsets.jar":[0,131072,1703936,1835008],"/lt/8/resources.jar":[0,131072,917504,1179648],"/lt/8/javaws.jar":[0,131072,1441792,1703936],"/lt/8/lib/security/java.security":[0,131072],"/lt/8/meta-index":[0,131072],"/lt/8/lib/jaxp.properties":[],"/lt/etc/timezone":[],"/lt/8/lib/tzdb.dat":[0,131072]} });

  //lib = await cheerpjRunLibrary("/app/saxon-he-12.4.jar:/app/Cheerp3Helpers.jar");
  //lib = await cheerpjRunLibrary("/app/cheerpj-basex-test/basex-11.7.jar:/app/cheerpj-basex-test/CheerpJBaseX11Helper.jar:/app/cheerpj-basex-test/lib/htmlparser-1.4.16.jar:/app/cheerpj-basex-test/lib/markup-blitz-1.6.jar:/app/cheerpj-basex-test/lib/jing-20220510.jar:/app/cheerpj-basex-test/lib/lucene-stemmers-3.4.0.jar:/app/cheerpj-basex-test/lib/jline-2.14.6.jar:/app/cheerpj-basex-test/lib/custom/saxon-he-12.4.jar");
  lib = await cheerpjRunLibrary("/app/cheerpj-basex12-fiddle/BaseX.jar:/app/cheerpj-basex12-fiddle/CheerpJBaseX12Helper.jar:/app/cheerpj-basex12-fiddle/lib/basex-api-12.0.jar:/app/cheerpj-basex12-fiddle/lib/htmlparser-1.4.16.jar:/app/cheerpj-basex12-fiddle/lib/markup-blitz-1.8.jar:/app/cheerpj-basex12-fiddle/lib/jing-20241231.jar:/app/cheerpj-basex12-fiddle/lib/lucene-stemmers-3.4.0.jar:/app/cheerpj-basex12-fiddle/lib/jline-2.14.6.jar:/app/cheerpj-basex12-fiddle/lib/custom/saxon-he-12.9.jar:/app/cheerpj-basex12-fiddle/lib/custom/xercesImpl.jar:/app/cheerpj-basex12-fiddle/lib/custom/xml-apis.jar:/app/cheerpj-basex12-fiddle/lib/custom/cupv10k-runtime.jar:/app/cheerpj-basex12-fiddle/lib/custom/org.eclipse.wst.xml.xpath2.processor_1.2.1.jar");

  console.log('Worker CheerpJ library initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'cheerpj3-load-indicator' });

  JException = await lib.java.lang.Exception;

  Context = await lib.org.basex.core.Context;
  
  QueryProcessor = await lib.org.basex.query.QueryProcessor;

  QueryException = await lib.org.basex.query.QueryException;

  Value = await lib.org.basex.query.value.Value;

  ByteArrayOutputStream = await lib.java.io.ByteArrayOutputStream;

  Iter = await lib.org.basex.query.iter.Iter;
  
  Serializer = await lib.org.basex.io.serial.Serializer;

  OutputSerializer = await lib.org.basex.io.serial.OutputSerializer;

  SerializerOptions = await lib.org.basex.io.serial.SerializerOptions; 

  BaseX12Helper = await lib.BaseX12Helper;
  
  StringReader = await lib.java.io.StringReader;

  StringWriter = await lib.java.io.StringWriter;

  StreamSource = await lib.javax.xml.transform.stream.StreamSource;

  URI = await lib.java.net.URI;
  
  context = await new Context();

  basexInitialized = true;
  
  importScripts("xquery-async.js");

  console.log('Worker BaseX initialized');
  
  postMessage({ type: 'message', message : 'hide', id : 'basex-load-indicator' });

})();

onmessage = async (e) => {
  var task = e.data.task;
  var data = e.data.data;
  if (task === 'xquery') {
	  await xquery(data.input, data.code, data.inputType);  
  }
}
