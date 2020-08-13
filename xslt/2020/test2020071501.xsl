<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">

  <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>
  
  <xsl:template match="book">
      <p>Book title <xsl:value-of select="title"/></p>
  </xsl:template>

  <xsl:template match="/">
    <html>
      <head>
        <title>Example</title>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
