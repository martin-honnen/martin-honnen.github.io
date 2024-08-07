<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:array="http://www.w3.org/2005/xpath-functions/array"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    expand-text="yes"
    exclude-result-prefixes="#all">

  <xsl:output method="adaptive" build-tree="no"/>

  <xsl:template name="xsl:initial-template">
    <xsl:sequence select="array { (1 to 5) ! map { 'name' : 'item' || ., 'data' : array { 1 to . } } }"/>
    <xsl:iterate select="1 to 5">
      <ixsl:schedule-action document="so59857493.xml">
        <xsl:call-template name="output-json">
          <xsl:with-param name="value" select="."/>
        </xsl:call-template>
      </ixsl:schedule-action>
    </xsl:iterate>
  </xsl:template>

  <xsl:template name="output-json">
    <xsl:param name="value"/>
    <xsl:result-document href="json-result-{$value}.json" method="json">
      <xsl:sequence select="map { 'name' : 'result' || $value, 'data' : array { 1 to $value } }"/>
    </xsl:result-document>
  </xsl:template>

</xsl:stylesheet>