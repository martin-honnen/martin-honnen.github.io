<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:mf="http://example.com/mf"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    exclude-result-prefixes="#all"
    version="3.0">
    
  <xsl:function name="mf:construct" as="item()">
      <xsl:param name="constructor" as="function(*)"/>
      <xsl:param name="arguments" as="array(*)"/>
      <xsl:sequence
          select="ixsl:apply(
                    ixsl:window() => ixsl:get('Reflect.construct'),
                    [$constructor, $arguments]
                  )"/>
  </xsl:function>
    
</xsl:stylesheet>
