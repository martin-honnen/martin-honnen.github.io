<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:user="http://example/com/user"
  exclude-result-prefixes="msxsl user">
  
<msxsl:script language="javascript" implements-prefix="user">
function getNode(nodeSelection) {
  return nodeSelection.item(0).selectSingleNode("book/qty/@value");
}
</msxsl:script>

<xsl:output method="html" indent="yes" version="4.01"/>

<xsl:template match="/">
  <xsl:variable name="rootElement" select="books"/>
  <html>
    <body>
      <h2>Book Details</h2>
      <div>
        <h3>XPath</h3>
        <xsl:value-of select="$rootElement/book/qty/@value"/>
      </div>
      <div>
        <h3>Script</h3>
        <xsl:value-of select="user:getNode($rootElement)"/>
      </div>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
