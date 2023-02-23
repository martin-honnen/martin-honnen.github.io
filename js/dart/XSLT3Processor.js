function XSLT3Processor() {
  this.saxonProc = SaxonJS;
}
XSLT3Processor.prototype.transform = function(input, xslt) {
  return this.saxonProc.XPath.evaluate(`transform(
  map {
    'stylesheet-text': $xslt, 
    'source-node' : parse-xml($xml),
    'delivery-format' : 'serialized'
  }
  )?output`,
  null, 
  { params : {
     xml: input, 
     xslt: xslt
    }
  })
};
