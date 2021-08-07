<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  xmlns:mf="http://example.com/mf"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  exclude-result-prefixes="#all"
  expand-text="yes">
  
  <xsl:import href="construct-js-object-from-map.xsl"/>
  
  <xsl:param name="properties" select="map { 'name' : 'foo', 'value' : 1 }"/>

  <xsl:template name="xsl:initial-template">
    <xsl:result-document href="#result">
		<section>
		  <xsl:variable name="object" select="mf:construct-object($properties)"/>
		  <h2>Saxon-JS test</h2>
		  <p>Result: <code>{$object}</code></p>
		  <xsl:message>$object: {$object}</xsl:message>
		</section>
	</xsl:result-document>
  </xsl:template>

</xsl:stylesheet>
