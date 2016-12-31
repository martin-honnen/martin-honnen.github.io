<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:svg="http://www.w3.org/2000/svg">

<xsl:output method="xml" indent="yes"/>

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
  <svg:svg width="20" height="20">
    <svg:circle cx="{x}" cy="{y}" r="10" fill="green"/>
  </svg:svg>
</xsl:template>

</xsl:stylesheet>

