<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" expand-text="true">

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:template match="document">
    <xsl:variable name="href" as="xs:string" select="resolve-uri('tmp/' || @name)"/>
    <xsl:result-document href="{$href}">
      <xsl:sequence select="*"/>
    </xsl:result-document>
    <xsl:copy>
      <xsl:copy-of select="@*"/>
      <xsl:attribute name="href" select="$href"/>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
