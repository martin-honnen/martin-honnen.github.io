<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:mf="http://example.com/mf"
  xmlns:svg="http://www.w3.org/2000/svg"
  exclude-result-prefixes="#all"
  expand-text="yes">
  
  <xsl:function name="mf:pan">
    <xsl:param name="svg-element" as="element()"/>
    <xsl:param name="dx" as="xs:double"/>
    <xsl:param name="dy" as="xs:double"/>
    <xsl:variable name="matrix" select="$svg-element => ixsl:get('transform') => ixsl:get('baseVal') => ixsl:get('0') => ixsl:get('matrix')"/>
    <ixsl:set-property object="$matrix"
                       name="e"
                       select="$matrix => ixsl:get(e) + $dx"/>
    <ixsl:set-property object="$matrix"
                       name="f"
                       select="$matrix => ixsl:get(f) + $dx"/>
  </xsl:function>
  
  <xsl:template mode="ixsl:onclick" match="id('pan1')">
    <xsl:sequence select="mf:pan(id('matrix-group'), 0, 25)"/>
  </xsl:template>
  
  <xsl:template mode="ixsl:onclick" match="id('pan2')">
    <xsl:sequence select="mf:pan(id('matrix-group'), 25, 0)"/>
  </xsl:template>
  
  <xsl:template mode="ixsl:onclick" match="id('pan3')">
    <xsl:sequence select="mf:pan(id('matrix-group'), 0, -25)"/>
  </xsl:template>
  
  <xsl:template mode="ixsl:onclick" match="id('pan4')">
    <xsl:sequence select="mf:pan(id('matrix-group'), -25, 0)"/>
  </xsl:template>

  <xsl:template name="xsl:initial-template">
    <section>
      <h2>SVG example</h2>
      <xsl:copy-of select="doc(sample1.svg)"/>
    </section>
  </xsl:template>
  
</xsl:stylesheet>
