<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="titles">
    <xsl:for-each-group select="title" group-by="ix">
      <h2><xsl:value-of select="current-grouping-key()"/></h2>
      <xsl:for-each select="current-group()">
        <p><xsl:value-of select="."/></p>
      </xsl:for-each>
    </xsl:for-each-group>
  </xsl:template>

</xsl:stylesheet>