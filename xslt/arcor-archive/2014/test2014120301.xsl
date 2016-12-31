<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:mf="http://example.com/mf"
    exclude-result-prefixes="xs mf"
    version="2.0">
    
<xsl:template name="main">
  <xsl:message select="'XSLT error thrown'" terminate="yes"/>
</xsl:template>

</xsl:stylesheet>
