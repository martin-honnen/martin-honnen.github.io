<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:map="http://www.w3.org/2005/xpath-functions/map"
    xmlns:mf="http://example.com/mf"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    exclude-result-prefixes="#all"
    version="3.0">
    
  <xsl:function name="mf:construct" as="item()" visibility="public">
      <xsl:param name="constructor" as="function(*)"/>
      <xsl:param name="arguments" as="array(*)"/>
      <xsl:sequence
          select="ixsl:apply(
                    ixsl:window() => ixsl:get('Reflect.construct'),
                    [$constructor, $arguments]
                  )"/>
  </xsl:function>
  
  <xsl:function name="mf:object">
      <xsl:param name="properties" as="map(*)"/>
	  <xsl:variable name="object"
	    select="ixsl:window()
		        => ixsl:get('Object')
				=> mf:construct([])"/>
				
      <xsl:for-each select="map:keys($properties)">
	    <ixsl:set-property
		  object="$object"
		  name="{.}"
		  select="$properties(.)"
		/>
	  </xsl:for-each>
	  
	  <xsl:sequence select="$object"/>
  </xsl:function>
    
</xsl:stylesheet>