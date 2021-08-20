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

  <xsl:output method="adaptive"/>
  
  <xsl:template name="xsl:initial-template">
    <xsl:sequence
      select="ixsl:window()
              => ixsl:get('Reflect.construct') 
              => ixsl:apply([ixsl:window() 
              => ixsl:get('Object'), []])"/>
  </xsl:template>

</xsl:stylesheet>