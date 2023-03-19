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
                       select="$matrix => ixsl:get('e') + $dx"/>
    <ixsl:set-property object="$matrix"
                       name="f"
                       select="$matrix => ixsl:get('f') + $dy"/>
  </xsl:function>

  <xsl:function name="mf:reset">
    <xsl:param name="svg-element" as="element()"/>
    <xsl:variable name="matrix" select="$svg-element => ixsl:get('transform') => ixsl:get('baseVal') => ixsl:get('0') => ixsl:get('matrix')"/>
    <ixsl:set-property object="$matrix"
                       name="a"
                       select="1"/>
    <ixsl:set-property object="$matrix"
                       name="b"
                       select="0"/>
    <ixsl:set-property object="$matrix"
                       name="c"
                       select="0"/>
    <ixsl:set-property object="$matrix"
                       name="d"
                       select="1"/>
    <ixsl:set-property object="$matrix"
                       name="e"
                       select="0"/>
    <ixsl:set-property object="$matrix"
                       name="f"
                       select="0"/>
  </xsl:function>

  <xsl:function name="mf:zoom">
    <xsl:param name="svg-element" as="element()"/>
    <xsl:param name="zoom" as="xs:double"/>
    <xsl:variable name="matrix" select="$svg-element => ixsl:get('transform') => ixsl:get('baseVal') => ixsl:get('0') => ixsl:get('matrix')"/>
    <xsl:variable name="viewBox" select="root($svg-element)/id('map-svg')/@viewBox => tokenize(' ')"/>
    <xsl:variable name="centerX" select="xs:double($viewBox[3]) div 2"/>
    <xsl:variable name="centerY" select="xs:double($viewBox[4]) div 2"/>
    <xsl:for-each select="'a', 'b', 'c', 'd', 'e', 'f'">
      <ixsl:set-property object="$matrix"
                         name="{.}"
                         select="$matrix => ixsl:get(.) * $zoom"/>
    </xsl:for-each>
    <ixsl:set-property object="$matrix"
                       name="e"
                       select="$matrix => ixsl:get('e') + (1 - $zoom) * $centerX"/>
    <ixsl:set-property object="$matrix"
                       name="f"
                       select="$matrix => ixsl:get('f') + (1 - $zoom) * $centerY"/>

  </xsl:function>
  
  <xsl:template mode="ixsl:onclick" match="id('reset')">
    <xsl:sequence select="mf:reset(id('matrix-group'))"/>
  </xsl:template>

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

  <xsl:template mode="ixsl:onclick" match="id('zoom1')">
    <xsl:sequence select="mf:zoom(id('matrix-group'), 0.8)"/>
  </xsl:template>

  <xsl:template mode="ixsl:onclick" match="id('zoom2')">
    <xsl:sequence select="mf:zoom(id('matrix-group'), 1.25)"/>
  </xsl:template>

  <xsl:template name="xsl:initial-template">
    <section>
      <h2>SVG example</h2>
      <xsl:copy-of select="doc('sample1.svg')"/>
    </section>
  </xsl:template>
  
</xsl:stylesheet>
