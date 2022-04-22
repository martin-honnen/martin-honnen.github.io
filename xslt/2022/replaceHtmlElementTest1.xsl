<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  expand-text="yes">

  <xsl:template match="html">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:result-document href="?." method="ixsl:replace-content">
        <xsl:apply-templates/>
      </xsl:result-document>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="meta[@charset]"/>
  
  <xsl:template match="style">
    <xsl:copy>{if (contains(., 'red')) then replace(., 'red', 'green') else replace(., 'green', 'red')}</xsl:copy>
  </xsl:template>

  <xsl:output method="html" html-version="5"/>

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="input[@type = 'button' and @id = 'button1']" mode="ixsl:onclick">
     <xsl:apply-templates select="/*"/>
  </xsl:template>

  <xsl:template match="/" name="xsl:initial-template">
    <input type="button" id="button1" value="test"/>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')} at {current-dateTime()}</xsl:comment>
  </xsl:template>

</xsl:stylesheet>
