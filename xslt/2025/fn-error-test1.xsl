<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/" name="xsl:initial-template">
    <result>
      <run-with>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</run-with>
      <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</xsl:comment>
    </result>
    <xsl:sequence select="error((), 'This is a test.')"/>
  </xsl:template>

</xsl:stylesheet>