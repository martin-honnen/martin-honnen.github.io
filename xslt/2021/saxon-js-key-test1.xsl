<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:saxon="http://saxon.sf.net/"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:key name="class" match="*" use="@class"/>

  <xsl:template name="xsl:initial-template">
    <xsl:result-document href="#content" method="ixsl:append-content">
      <p id="p{count(id('content')/p) + 1}" class="foo">This is paragraph {count(id('content')/p) + 1} created at {saxon:timestamp()}.</p>
    </xsl:result-document>
    <xsl:call-template name="check-content"/>
  </xsl:template>

  <xsl:template name="check-content">
    <xsl:message select="count(id('content')/p), count(key('class', 'foo', ixsl:page()))"/>
  </xsl:template>

  <xsl:template match="input[@id = 'test']" mode="ixsl:onclick">
    <xsl:call-template name="xsl:initial-template"/>
  </xsl:template>
  
</xsl:stylesheet>