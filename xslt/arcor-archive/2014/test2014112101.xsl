<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="2.0">
  
<xsl:param name="filter" select="()"/>

<xsl:key name="by-value" match="item" use="."/>

<xsl:template match="@* | node()">
  <xsl:copy>
    <xsl:apply-templates select="@* , node()"/>
  </xsl:copy>
</xsl:template>

<xsl:template match="item[not(key('by-value', ., $filter))]"/>

</xsl:stylesheet>
