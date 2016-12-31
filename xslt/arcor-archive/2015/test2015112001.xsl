<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html"
            version="5.0"
            doctype-system="about:legacy-compat"
            indent="yes"/>
            
<xsl:template match="/">
  <html lang="en">
    <head>
      <title>Test</title>
      <style type="text/css">
      p { width: 200px; overflow: auto; }
      </style>
    </head>
    <body>
      <h1>Test</h1>
      <xsl:apply-templates/>
    </body>
  </html>
</xsl:template>

<xsl:template match="para">
  <p>
    <xsl:apply-templates/>
  </p>
</xsl:template>

</xsl:stylesheet>