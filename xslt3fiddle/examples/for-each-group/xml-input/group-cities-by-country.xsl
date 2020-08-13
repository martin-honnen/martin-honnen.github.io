<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0">
    
<xsl:output method="html" version="5"/>

<xsl:template match="/">
    <html lang="en">
        <head>
            <title>Simple group-by example from XSLT 3 specification</title>
        </head>
        <body>
            <table>
              <tr>
                <th>Position</th>
                <th>Country</th>
                <th>City List</th>
                <th>Population</th>
              </tr>
              <xsl:for-each-group select="cities/city" group-by="@country">
                <tr>
                  <td><xsl:value-of select="position()"/></td>
                  <td><xsl:value-of select="current-grouping-key()"/></td>
                  <td>
                    <xsl:value-of select="sort(current-group()/@name)" separator=", "/>
                  </td>
                  <td><xsl:value-of select="sum(current-group()/@pop)"/></td>
                </tr>
              </xsl:for-each-group>
            </table>            
        </body>
    </html>
</xsl:template>

</xsl:stylesheet>
