<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:mf="http://example.com/mf"
    exclude-result-prefixes="#all"
    expand-text="yes">

  <xsl:import href="generic-positional-grouping-functions-streaming.xsl"/>

  <xsl:mode streamable="yes"/>

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="root">
    <root>
      <xsl:iterate select="mf:group-into-sequence-of-arrays(item, 3)">
        <xsl:result-document href="split-results/chunk-{position()}.xml">
          <chunk index="{position()}">
            <xsl:sequence select="?*"/>
          </chunk>
        </xsl:result-document>
      </xsl:iterate>
    </root>
  </xsl:template>

  <xsl:template match="/">
    <xsl:next-match/>
    <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
  </xsl:template>

</xsl:stylesheet>
