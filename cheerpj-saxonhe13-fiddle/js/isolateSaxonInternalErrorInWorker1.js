importScripts("https://cjrtnc.leaningtech.com/4.3/loader.js");//importScripts("https://cjrtnc.leaningtech.com/4.2/loader.js"); //"https://cjrtnc.leaningtech.com/3_20250414_1093/cj3loader.js"); //https://cjrtnc.leaningtech.com/3_20250330_890/cj3loader.js");//https://cjrtnc.leaningtech.com/3.1/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241216_574/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241213_572/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3.0/cj3loader.js");
var lib = null;

var SaxonProcessor = null;

var StringReader = null;

var StringWriter = null;

var StreamSource = null;

var URI = null;

var JException = null;

var SaxonApiException = null;

var saxonProcessor = null;

var xqueryCompiler = null;

var xqueryExecutable = null;

var xqueryEvaluator = null;

var input = null;
var xqueryCode = `for $n in (1 to 5) return $n * $n`;

(async function () {


  await cheerpjInit({version: 17});

  lib = await cheerpjRunLibrary("/app/cheerpj-saxonhe13-fiddle/saxon-he-13.0.jar:/app/cheerpj-saxonhe13-fiddle/lib/xmlresolver-6.0.23.jar");

  JException = await lib.java.lang.Exception;

  SaxonProcessor = await lib.net.sf.saxon.s9api.Processor;

  SaxonApiException = await lib.net.sf.saxon.s9api.SaxonApiException;

  saxonProcessor = await new SaxonProcessor(false);

  xqueryCompiler = await saxonProcessor.newXQueryCompiler();

  xqueryExecutable = await xqueryCompiler.compile(xqueryCode);

  xqueryEvaluator = await xqueryExecutable.load();

  await xqueryEvaluator.setContextItem(input);

  var result = await xqueryEvaluator.evaluate();

  var resultString = await result.toString();

  console.log(`XQuery result: ${resultString}`);

})();

