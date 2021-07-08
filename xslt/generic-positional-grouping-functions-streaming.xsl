<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:mf="http://example.com/mf"
    exclude-result-prefixes="#all">

  <xsl:function name="mf:group-chunks" as="item()*" visibility="public" streamability="absorbing">
    <xsl:param name="items" as="item()*"/>
    <xsl:param name="chunk-size" as="xs:integer"/>
    <xsl:param name="handle-chunk" as="function(item()*, xs:integer) as item()*"/>
    <xsl:for-each-group select="$items" group-adjacent="(position() - 1) idiv $chunk-size">
      <xsl:sequence select="$handle-chunk(current-group(), position())"/>
    </xsl:for-each-group>
  </xsl:function>

  <xsl:function name="mf:group-into-document-fragments" as="document-node()*" visibility="public" streamability="absorbing">
    <xsl:param name="items" as="item()*"/>
    <xsl:param name="chunk-size" as="xs:integer"/>
    <xsl:for-each-group select="$items" group-adjacent="(position() - 1) idiv $chunk-size">
      <xsl:document>
        <xsl:sequence select="current-group()"/>
      </xsl:document>
    </xsl:for-each-group>
  </xsl:function>

  <xsl:function name="mf:group-into-sequence-of-arrays" as="array(*)*" visibility="public" streamability="absorbing">
    <xsl:param name="items" as="item()*"/>
    <xsl:param name="chunk-size" as="xs:integer"/>
    <xsl:for-each-group select="$items" group-adjacent="(position() - 1) idiv $chunk-size">
      <xsl:sequence select="array { current-group() }"/>
    </xsl:for-each-group>
  </xsl:function>

</xsl:stylesheet>
