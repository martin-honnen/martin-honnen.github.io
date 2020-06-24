<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    expand-text="yes"
    exclude-result-prefixes="#all">

  <xsl:output method="adaptive" build-tree="no"/>

  <xsl:template name="xsl:initial-template">
    <xsl:sequence select="static-base-uri()"/>
  </xsl:template>

</xsl:stylesheet>