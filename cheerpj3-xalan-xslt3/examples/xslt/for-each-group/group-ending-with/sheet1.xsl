<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0">

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="doc">
    <doc>
      <xsl:for-each-group select="*" group-ending-with="page[not(@continued='yes')]">
        <pageset>
          <xsl:for-each select="current-group()">
            <page><xsl:value-of select="."/></page>
          </xsl:for-each>
        </pageset>
      </xsl:for-each-group>
    </doc>
  </xsl:template>

</xsl:stylesheet>