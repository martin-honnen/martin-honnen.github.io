<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  xmlns:array="http://www.w3.org/2005/xpath-functions/array"
  exclude-result-prefixes="#all">

  <xsl:output method="html" indent="no"/>

  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <xsl:copy>
      <xsl:apply-templates/>
      <xsl:comment>Run with <xsl:value-of select="system-property('xsl:vendor')"/> at <xsl:value-of select="current-dateTime()"/></xsl:comment>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
