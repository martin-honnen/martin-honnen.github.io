<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:axsl="http://example.com/xsl-alias"
  xmlns:axhtml="http://example.com/xhtml-alias"
  exclude-result-prefixes="xhtml axsl axhtml"
  xmlns="http://www.w3.org/1999/xhtml">
  
<xsl:output method="xml" indent="yes"/>

<xsl:namespace-alias stylesheet-prefix="axsl" result-prefix="xsl"/>
<xsl:namespace-alias stylesheet-prefix="axhtml" result-prefix="#default"/>

<xsl:template match="@* | node()">
  <xsl:copy>
    <xsl:apply-templates select="@* | node()"/>
  </xsl:copy>
</xsl:template>

<xsl:template match="xhtml:head">
  <xsl:copy>
    <xsl:apply-templates select="@* | node()"/>
    <axsl:stylesheet version="1.0">
      <axsl:template match="/">
        <axhtml:p>XSLT created paragraph.</axhtml:p>
      </axsl:template>
    </axsl:stylesheet>
  </xsl:copy>
</xsl:template>

</xsl:stylesheet>