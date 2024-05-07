<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">
  
  <xsl:param name="dic-en" select="document(lexicon/wordlist1)"/>
  
  <xsl:param name="dic-se" select="document(lexicon/wordlist2)"/>

  <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>test</title>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>English</th>
              <th>Swedish</th>
            </tr>
          </thead>
          <tbody>
            <xsl:apply-templates select="$dic-en//word"/>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="word">
    <xsl:variable name="pos" select="position()"/>
    <tr>
      <td>
        <xsl:value-of select="."/>
      </td>
      <td>
        <xsl:value-of select="$dic-se//word[$pos]"/>
      </td>
    </tr>
  </xsl:template>

</xsl:stylesheet>
