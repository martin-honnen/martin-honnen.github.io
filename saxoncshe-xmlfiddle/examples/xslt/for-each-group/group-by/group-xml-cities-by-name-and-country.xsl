<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
        <xsl:for-each-group select="cities/city"
                            group-by="@name, @country"
                            composite="yes">
          <p>
            <xsl:value-of select="current-grouping-key()[1] || ', ' ||
                          current-grouping-key()[2] || ': ' ||
                          avg(current-group()/@pop)"/>
          </p>
        </xsl:for-each-group>
  </xsl:template>

</xsl:stylesheet>