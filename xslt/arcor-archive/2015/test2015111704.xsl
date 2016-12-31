<!DOCTYPE xsl:stylesheet [
  <!ENTITY nbsp "&#160;">
]>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">
  
<xsl:template match="list">
  <ul>
    <xsl:apply-templates/>
  </ul>
</xsl:template>

<xsl:template match="item">
  <li>
    <xsl:apply-templates/>
  </li>
</xsl:template>

<xsl:template match="em">
  <xsl:text>&nbsp;</xsl:text>
  <xsl:copy>
    <xsl:apply-templates/>
  </xsl:copy>
</xsl:template>

</xsl:stylesheet>