<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  xmlns:mf="http://example.com/mf"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:function name="mf:construct-object" visibility="public">
    <xsl:param name="properties" as="map(*)"/>

    <xsl:variable
      name="object"
      select="ixsl:window()
              => ixsl:get('Reflect.construct') 
              => ixsl:apply([
                   ixsl:window() => ixsl:get('Object'), 
                   []
                 ])"/>

    <xsl:for-each select="map:keys($properties)">
      <ixsl:set-property
        object="$object"
        name="{.}"
        select="$properties(.)"/>
    </xsl:for-each>

    <xsl:sequence select="$object"/>

  </xsl:function>

</xsl:stylesheet>