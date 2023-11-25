<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:mf="http://example.com/mf"
  exclude-result-prefixes="#all">
  
  <xsl:function name="mf:group" as="map(*)*">
    <xsl:param name="items" as="map(*)*"/>
    <xsl:param name="group-by-fn" as="function(map(*)) as item()*"/>
    <xsl:for-each-group select="$items" group-by="$group-by-fn(.)">
      <xsl:sequence
        select="map { 
                  'category' : current-grouping-key(), 
                  'items' : array { current-group()?name } 
                }"/>
    </xsl:for-each-group>
  </xsl:function>

  <xsl:output method="json" indent="yes"/>

  <xsl:template match="." name="xsl:initial-template">
    <xsl:sequence select="map { 'item' : array { mf:group(?items?*, function($item) { $item?categories?* }) } }"/>
  </xsl:template>
  
</xsl:stylesheet>
