<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:document>
      <xsl:apply-templates/>
    	<xsl:comment>Run with {static-base-uri()} using {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')} at {current-dateTime()}</xsl:comment>
    </xsl:document>
  </xsl:template>
  
</xsl:stylesheet>