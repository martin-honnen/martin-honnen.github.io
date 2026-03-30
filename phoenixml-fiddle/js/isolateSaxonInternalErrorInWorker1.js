importScripts("https://cjrtnc.leaningtech.com/4.2/loader.js"); //"https://cjrtnc.leaningtech.com/3_20250414_1093/cj3loader.js"); //https://cjrtnc.leaningtech.com/3_20250330_890/cj3loader.js");//https://cjrtnc.leaningtech.com/3.1/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241216_574/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3_20241213_572/cj3loader.js"); //importScripts("https://cjrtnc.leaningtech.com/3.0/cj3loader.js");

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


var docBuilder = null;


(async () => {

  await cheerpjInit({version: 8});

  lib = await cheerpjRunLibrary("/app/cheerpj3-saxonhe12-fiddle/Saxon-HE-12.9.jar:/app/cheerpj3-saxonhe12-fiddle/Cheerp3Helpers.jar");
  
  console.log('Worker CheerpJ 4.2 library initialized');

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

  docBuilder = await saxonProcessor.newDocumentBuilder();

  xsltCompiler = await saxonProcessor.newXsltCompiler();


  console.log('Worker Saxon initialized');

  var input = `<data>200</data>`;
  var xsltCode = `<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:f="http://example.com/functions"
                exclude-result-prefixes="#all"
                expand-text="yes">

  <xsl:param name="n" as="xs:integer" select="200"/>

  <xsl:output method="xml" indent="yes"/>

  <xsl:function name="f:fib" as="xs:integer" cache="yes">
    <xsl:param name="num" as="xs:integer"/>
    <xsl:sequence
      select="if ($num = 0)
             then 0
             else if ($num = 1)
             then 1
             else f:fib($num - 2) + f:fib($num - 1)"/>
  </xsl:function>

  <xsl:template name="xsl:initial-template" match="/">
    <fib n="{$n}">{f:fib($n)}</fib>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</xsl:comment>
  </xsl:template>

</xsl:stylesheet>`;

  var results = await SaxonHelpers.runXsltTransformation(input, 'XML', 'urn:from-string', xsltCode, 'urn:from-string');

  var resultDocuments = [];

  var size = results.length;

  for (var i = 0; i < size; i++) {
    var currentResult = results[i];
    var uri = await currentResult.getUri();
    var content = await currentResult.getContent();
    let method = await currentResult.getMethod();
    //let suffix = uri.replace(/.*(\.[a-z]+)/gi, '$1').toLowerCase();
    //let method = filetypes[suffix];
    resultDocuments.push({ uri: uri, content: content, method: method ? method : 'html' });
  }

  console.log(resultDocuments);

})();

