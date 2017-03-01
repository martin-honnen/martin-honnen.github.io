<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <xsl:processing-instruction name="xml-stylesheet">type="text/css" href="test2017022801.css"</xsl:processing-instruction>
    <books>
        <xsl:for-each select="books/book">
          <book>
            <title><xsl:value-of select="@title"/></title>
            <price><xsl:value-of select="@price"/></price>
          </book>
        </xsl:for-each>
    </books>
  </xsl:template>
</xsl:stylesheet>