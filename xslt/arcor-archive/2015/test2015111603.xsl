<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
  <div>
    <script>
    log('Inline script in HTML fragment created by XSLT');
    </script>
  </div>
</xsl:template>

</xsl:stylesheet>