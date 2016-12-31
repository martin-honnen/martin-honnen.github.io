<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:param name="lf1" select="'&#10;'"/>
<xsl:param name="lf2" xml:space="preserve">&#10;</xsl:param>

<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
  <html>
    <head>
      <title>Bug with character reference in attribute value?</title>
    </head>
    <body>
      <h1>Bug with character reference in attribute value?</h1>
      <xsl:apply-templates/>
    </body>
  </html>
</xsl:template>

<xsl:template match="/*">
  <section>
    <h2>Test</h2>
    <p><code>$lf1 = $lf2: <xsl:value-of select="$lf1 = $lf2"/></code></p>
  </section>
</xsl:template>

</xsl:stylesheet>