<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:mf="http://example.com/mf"
  exclude-result-prefixes="#all"
  xmlns="http://www.w3.org/1999/xhtml"
  expand-text="yes">
  
  <xsl:function name="mf:result-doc-test1" ixsl:updating="true">
    <xsl:result-document href="#result1">
      <div>
        <xsl:text>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:text>
        <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>      
      </div>
    </xsl:result-document>
  </xsl:function>

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:sequence select="mf:result-doc-test1()"/>
    <ixsl:promise select="ixsl:json-doc('https://martin-honnen.github.io/xslt/2024/sample1.json')" on-completion="mf:go#1"/>
  </xsl:template>
  
  <xsl:function name="mf:go" ixsl:updating="true">
    <xsl:param name="parsed-json" as="item()"/>
    <xsl:result-document href="#async-result1">
      <div>
        <code><xsl:sequence select="serialize($parsed-json, map{'method':'json'})"/></code>
      </div>
    </xsl:result-document>
  </xsl:function>
  
</xsl:stylesheet>