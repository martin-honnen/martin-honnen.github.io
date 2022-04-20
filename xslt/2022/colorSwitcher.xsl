<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0" xpath-default-namespace="http://www.w3.org/1999/xhtml">
  <xsl:output method="html"/>

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="meta[@charset]"/>

  <xsl:template match="style">
    <xsl:copy>
      <xsl:value-of select="if (contains(., 'red')) then replace(., 'red', 'green') else replace(., 'green', 'red')"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>