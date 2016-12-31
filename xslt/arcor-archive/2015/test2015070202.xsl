<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:ms="urn:schemas-microsoft-com:xslt"
  xmlns:mf="http://example.com/mf"
  exclude-result-prefixes="ms mf">
  
<xsl:output method="html" indent="yes"/>

<ms:script language="JScript" implements-prefix="mf">
function serialize(nodeSelection) {
  return nodeSelection[0].xml;
}
</ms:script>

<xsl:template match="/">
  <html lang="en">
    <head>
      <title>Test</title>
    </head>
    <body>
      <h1>Test</h1>
      <xsl:apply-templates/>
    </body>
  </html>
</xsl:template>

<xsl:template match="catalog">
  <table>
    <tbody>
      <xsl:apply-templates/>
    </tbody>
  </table>
</xsl:template>

<xsl:template match="cd">
  <tr>
    <xsl:apply-templates/>
  </tr>
</xsl:template>

<xsl:template match="cd/*">
  <td>
    <xsl:choose>
      <xsl:when test="function-available('mf:serialize')">
        <xsl:value-of select="mf:serialize(.)"/>
      </xsl:when>
      <xsl:otherwise>
        <xmp>
          <xsl:copy-of select="."/>
        </xmp>
      </xsl:otherwise>
    </xsl:choose>
  </td>
</xsl:template>

</xsl:stylesheet>