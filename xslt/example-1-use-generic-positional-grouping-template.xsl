<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:mf="http://example.com/mf"
    xmlns:ex="http://example.com/ex"
    exclude-result-prefixes="#all"
    expand-text="yes">

  <xsl:import href="generic-positional-grouping-template.xsl"/>

  <xsl:template match="ex:process-group">
    <xsl:param name="group" as="item()*"/>
    <xsl:param name="pos" as="xs:integer"/>
    <xsl:param name="wrapper-name" as="xs:QName" select="QName('', 'chunk')"/>
    <xsl:element name="{$wrapper-name}" namespace="{namespace-uri-from-QName($wrapper-name)}">
      <xsl:attribute name="index" select="$pos"/>
      <xsl:sequence select="$group"/>
    </xsl:element>   
  </xsl:template>

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="root">
    <root>
      <xsl:call-template name="mf:group-chunks">
        <xsl:with-param name="items" select="item"/>
        <xsl:with-param name="chunk-size" select="3"/>
        <xsl:with-param name="push-chunk-to" as="element(ex:process-group)">
          <ex:process-group/>
        </xsl:with-param>
      </xsl:call-template>
    </root>
  </xsl:template>

  <xsl:template match="/">
    <xsl:next-match/>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
  </xsl:template>

</xsl:stylesheet>
