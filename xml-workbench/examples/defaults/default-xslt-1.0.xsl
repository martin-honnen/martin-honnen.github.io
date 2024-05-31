<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">

  <xsl:output method="html" indent="yes" doctype-public="about:legacy-doctype"/>

  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <xsl:copy>
      <xsl:apply-templates/>
      <xsl:comment>Run with <xsl:value-of select="system-property('xsl:vendor')"/></xsl:comment>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
