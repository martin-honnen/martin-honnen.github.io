<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:mf="http://example.com/mf"
  exclude-result-prefixes="#all"
  expand-text="yes">
  
  <xsl:function name="mf:f1" as="xs:string">
    <xsl:param name="m1" as="map(*)"/>
    <xsl:sequence select="serialize($m1, map { 'method' : 'json' })"/>
  </xsl:function>

  <xsl:output method="html" html-version="5.0" indent="yes"/>

  <xsl:template match="/" name="xsl:initial-template">
    <section>
      <h2>Test</h2>
      <p>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</p>
      <input type="button" value="test"
        onclick="SaxonJS.transform({ destination: 'raw', stylesheetInternal: internalStylesheet, initialFunction: 'Q{http://example.com/mf}f1', functionParams: [ { x: 1, y: 'foo' }] }, 'async').then(result => console.log(result.principalResult));">
    </section>
  </xsl:template>

</xsl:stylesheet>
