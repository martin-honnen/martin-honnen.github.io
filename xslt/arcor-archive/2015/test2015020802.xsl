<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes" version="5.0" doctype-system="about:legacy-compat"/>

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

<xsl:template match="para">
  <p>
    <xsl:apply-templates/>
  </p>
</xsl:template>

<xsl:template match="data">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <circle cx="{x}" cy="{y}" r="10" fill="green"/>
  </svg>
</xsl:template>

</xsl:stylesheet>

