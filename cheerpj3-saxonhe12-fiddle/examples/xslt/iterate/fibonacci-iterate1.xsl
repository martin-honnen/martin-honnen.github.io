<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:f="http://example.com/functions"
                exclude-result-prefixes="#all"
                expand-text="yes">

  <xsl:function name="f:iterative-fib" as="xs:integer">
    <xsl:param name="n" as="xs:integer"/>
    <xsl:iterate select="1 to $n">
      <xsl:param name="n" select="0"/>
      <xsl:param name="next" select="1"/>
      <xsl:on-completion select="$n"/>
      <xsl:next-iteration>
        <xsl:with-param name="n"
                        select="$next"/>
        <xsl:with-param name="next"
                        select="$n + $next"/>
      </xsl:next-iteration>
    </xsl:iterate>
  </xsl:function>

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/" name="xsl:initial-template">
    <fib n="{/*}">{f:iterative-fib(/*)}</fib>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</xsl:comment>
  </xsl:template>

</xsl:stylesheet>
