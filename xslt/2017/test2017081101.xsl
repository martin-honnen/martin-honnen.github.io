<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<xsl:template match="/">
  <html>
  <body>
  <h2>caja</h2>
  <table border="1">
    <tr bgcolor="#9acd32">
      <th>autor</th>
      <th>editorial</th>
    </tr>
    <xsl:for-each select="caja/Cuadernos/Libro">
      <tr>
        <td><xsl:value-of select="autor"/></td>
          <xsl:choose>
              <xsl:when test="precio > 7">
                <td bgcolor="#ff00ff"><xsl:value-of select="editorial"/></td>
              </xsl:when>
              <xsl:otherwise>
                <td><xsl:value-of select="editorial"/></td>
              </xsl:otherwise>
          </xsl:choose>
      </tr>
    </xsl:for-each>
  </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
