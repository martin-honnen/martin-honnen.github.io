<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Country</th>
          <th>City List</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each-group select="cities/city" group-by="@country">
          <tr>
            <td><xsl:value-of select="position()"/></td>
            <td><xsl:value-of select="current-grouping-key()"/></td>
            <td>
              <xsl:for-each select="current-group()/@name">
                <xsl:sort select="."/>
                <xsl:if test="position() ne 1">, </xsl:if>
                <xsl:value-of select="."/>
              </xsl:for-each>
            </td>
            <td><xsl:value-of select="sum(current-group()/@pop)"/></td>
          </tr>
        </xsl:for-each-group>
      </tbody>
    </table>
  </xsl:template>

</xsl:stylesheet>