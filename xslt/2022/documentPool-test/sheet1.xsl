<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:apply-templates select="doc('input1.xml')/node()"/>
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