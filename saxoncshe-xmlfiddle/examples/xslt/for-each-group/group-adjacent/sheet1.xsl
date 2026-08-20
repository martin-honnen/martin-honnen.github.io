<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="p">
    <xsl:for-each-group select="node()"
                        group-adjacent="self::ul or self::ol">
      <xsl:choose>
        <xsl:when test="current-grouping-key()">
          <xsl:copy-of select="current-group()"/>
        </xsl:when>
        <xsl:otherwise>
          <p>
            <xsl:copy-of select="current-group()"/>
          </p>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:for-each-group>
  </xsl:template>

</xsl:stylesheet>