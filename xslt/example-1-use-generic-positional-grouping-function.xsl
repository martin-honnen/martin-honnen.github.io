<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:mf="http://example.com/mf"
    xmlns:ex="http://example.com/ex"
    exclude-result-prefixes="#all"
    expand-text="yes">

  <xsl:import href="generic-positional-grouping-functions.xsl"/>

  <xsl:function name="ex:wrap-rows" as="element()">
    <xsl:param name="group" as="item()*"/>
    <xsl:param name="wrapper-name" as="xs:QName"/>
    <xsl:element name="{$wrapper-name}" namespace="{}">
      <xsl:sequence select="$group"/>
    </xsl:element>
  </xsl:function>

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="root">
    <root>
      <xsl:sequence select="mf:group-chunks(item, 3, ex:wrap-rows(?, QName('', 'chunk')))"/>
    </root>
  </xsl:template>

  <xsl:template match="/">
    <xsl:next-match/>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
  </xsl:template>

</xsl:stylesheet>
