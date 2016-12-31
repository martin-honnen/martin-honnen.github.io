<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns:ms="urn:schemas-microsoft-com:xslt"
  xmlns:mf="http://example.com/mf"
  exclude-result-prefixes="ms mf">

<xsl:output
  method="xml"
  version="1.0"
  indent="yes"/>
  
<ms:script language="Javascript" implements-prefix="mf">
function sin(n) {
  return Math.sin(n);
}
</ms:script>

<xsl:template match="/">
  <html lang="en">
    <head>
      <title>Test</title>
    </head>
    <body>
      <h1>test</h1>
      <p><xsl:if test="function-available('mf:sin')">
           <xsl:value-of select="mf:sin(number(root/test))"/>
         </xsl:if>
      </p>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>


