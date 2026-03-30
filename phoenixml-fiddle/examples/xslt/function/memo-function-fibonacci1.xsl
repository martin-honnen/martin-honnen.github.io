<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:f="http://example.com/functions"
                exclude-result-prefixes="#all"
                expand-text="yes">

  <xsl:output method="xml" indent="yes"/>

  <xsl:function name="f:fib" as="xs:integer" cache="yes">
    <xsl:param name="num" as="xs:integer"/>
    <xsl:sequence
      select="if ($num = 0)
             then 0
             else if ($num = 1)
             then 1
             else f:fib($num - 2) + f:fib($num - 1)"/>
  </xsl:function>

  <xsl:template name="xsl:initial-template" match="/">
    <fib n="{/*}">{f:fib(/*)}</fib>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</xsl:comment>
  </xsl:template>

</xsl:stylesheet>
