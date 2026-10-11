<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                expand-text="yes"
                exclude-result-prefixes="#all">

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="/">
    <xsl:copy>
      <xsl:apply-templates/>
      <xsl:comment>Run with Java {system-property('java.version')} and {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</xsl:comment>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>