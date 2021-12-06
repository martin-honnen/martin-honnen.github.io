<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all">

  <xsl:output method="json" indent="yes"/>

  <xsl:template match=".">
    <xsl:map>
      <xsl:for-each-group select="?sales?*" group-by="?product">
        <xsl:sort select="current-grouping-key()"/>
        <xsl:map-entry key="current-grouping-key()" select="sum(current-group()?quantity)"/>
      </xsl:for-each-group>
    </xsl:map>
  </xsl:template>

</xsl:stylesheet>
