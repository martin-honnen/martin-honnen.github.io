<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:msxml="urn:schemas-microsoft-com:xslt"
  exclude-result-prefixes="msxml"
	version="1.0">

  <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Test</title>
        <link rel="manifest" href="manifest.webmanifest"/>
        <script src="index.js" defer="defer"></script>
      </head>
      <body>
        <h1>Test</h1>
        <xsl:apply-templates/>
      </body>
    </html>

    <xsl:comment>
      <xsl:text>Run with processor </xsl:text>
      <xsl:value-of select="system-property('xsl:vendor')"/>
      <xsl:choose>
        <xsl:when test="system-property('xsl:version') > 1.0">
          <xsl:value-of select="concat(' Product ', system-property('xsl:product-name'), ' ', system-property('xsl:product-version'))"/>
        </xsl:when>
        <xsl:when test="system-property('msxml:version')">
          <xsl:text> </xsl:text>
          <xsl:value-of select="system-property('msxml:version')"/>
        </xsl:when>
      </xsl:choose>
    </xsl:comment>
  </xsl:template>

  <xsl:template match="items">
    <ul>
      <xsl:apply-templates/>
    </ul>
  </xsl:template>

  <xsl:template match="item">
    <li>
      <xsl:apply-templates/>
    </li>
  </xsl:template>

</xsl:stylesheet>
