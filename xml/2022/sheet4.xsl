<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:include href="sheet1.xsl"/>

  <xsl:template match="/">
    <xsl:next-match/>
    <xsl:iterate select="1 to 3">
      <xsl:result-document href="result-{.}.xml">
        <result>result {.}</result>
      </xsl:result-document>
    </xsl:iterate>
  </xsl:template>
  
</xsl:stylesheet>