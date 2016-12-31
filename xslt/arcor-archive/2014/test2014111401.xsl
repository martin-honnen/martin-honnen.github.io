<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">

<xsl:output
  method="html"
  version="4.01"
  indent="yes"
  doctype-public="-//W3C//DTD HTML 4.01//EN"
  doctype-system="http://www.w3.org/TR/html4/strict.dtd"/>
  
<xsl:template match="/">
  <html lang="en">
    <head>
      <title>Test of XSLT generation of URL in src attribute of img element</title>
    </head>
    <body>
      <h1>Test</h1>
      <xsl:apply-templates/>
      <div>
        <h2>Test with static img elements</h2>
        <ul>
          <li>image-with-umlaut-ä.png:
            <img src="image-with-umlaut-ä.png" alt="arrow"/>
          </li>
          <li>image-with-umlaut-%C3%A4.png:
            <img src="image-with-umlaut-%C3%A4.png" alt="arrow"/>
          </li>
        </ul>
      </div>
    </body>
  </html>
</xsl:template>

<xsl:template match="images">
  <div>
    <h2>XSLT generated images</h2>
    <ul>
      <xsl:apply-templates/>
    </ul>
  </div>
</xsl:template>

<xsl:template match="image">
  <li>
    <xsl:value-of select="file-name"/>: <img src="{file-name}" alt="{text}"/>
  </li>
</xsl:template>
</xsl:stylesheet>
