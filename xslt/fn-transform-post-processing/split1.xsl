<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  expand-text="yes">
  
  <xsl:param name="chunk-size" as="xs:integer" select="30"/>

  <xsl:mode on-no-match="shallow-copy" streamable="yes"/>
  
  <xsl:template match="/*">
    <xsl:variable name="root-name" select="node-name()"/>
    <xsl:for-each-group select="*" group-adjacent="(position() - 1) idiv $chunk-size">
      <xsl:result-document href="chunk-{position()}.xml" indent="yes">
        <xsl:element name="{$root-name}">
          <xsl:apply-templates select="current-group()"/>
        </xsl:element>        
      </xsl:result-document>
    </xsl:for-each-group>
  </xsl:template>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:next-match/>
    <test>
      <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
    </test>
  </xsl:template>
  
</xsl:stylesheet>
