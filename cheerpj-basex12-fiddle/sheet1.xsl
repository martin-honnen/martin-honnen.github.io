<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                exclude-result-prefixes="#all">

  <xsl:template match="/*">
    <xsl:copy>
      <xsl:value-of select="value" separator=", "/>
    </xsl:copy>
    <xsl:comment expand-text="yes">Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</xsl:comment>

  </xsl:template>

</xsl:stylesheet>