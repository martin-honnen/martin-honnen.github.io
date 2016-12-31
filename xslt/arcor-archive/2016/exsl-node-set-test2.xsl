<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:exsl="http://exslt.org/common"
  xmlns:msxsl="urn:schemas-microsoft-com:xslt"
  exclude-result-prefixes="exsl msxsl">
  
<msxsl:script language="JScript" implements-prefix="exsl">
this['node-set'] =  function (x) {
  return x;
}
</msxsl:script>

<xsl:output method="html" version="5.0" indent="yes" doctype-system="about:legacy-compat"/>

<xsl:template match="/">
  <html lang="en">
    <head>
      <title>Testing exsl:node-set support</title>
    </head>
    <body>
      <h1>Testing exsl:node-set support</h1>
      <p>Result of <code>function-available('exsl:node-set'): <xsl:value-of select="function-available('exsl:node-set')"/></code>.</p>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>