<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  expand-text="yes">
  
  <xsl:param name="xslt-uris" as="xs:string*" select="'sheet1.xsl', 'sheet2.xsl', 'sheet3.xsl'"/>

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:sequence
      select="fold-left($xslt-uris, /, function($a, $s) { transform(map{'source-node': $a, 'stylesheet-node': doc($s) })?output })"/>
  </xsl:template>
  
</xsl:stylesheet>
