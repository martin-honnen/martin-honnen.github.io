<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0">

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="body">
    <chapter>
      <xsl:for-each-group select="*" group-starting-with="h2">
        <section title="{self::h2}">
          <xsl:for-each select="current-group()[self::p]">
            <para><xsl:value-of select="."/></para>
          </xsl:for-each>
        </section>
      </xsl:for-each-group>
    </chapter>
  </xsl:template>

</xsl:stylesheet>