<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0"
  xmlns="http://www.w3.org/1999/xhtml">
  
<xsl:output method="xml" indent="yes"/>

<xsl:template match="root">
  <html xml:lang="en">
    <head>
      <title>Test of DOMContentLoaded in XSLT generated XHTML document</title>
      <script src="test2016012404.js"></script>
    </head>
    <body>
      <h1>Test of DOMContentLoaded in XSLT generated XHTML document</h1>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>