<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:output method="xml" indent="yes"/>

  <xsl:param name="chunk-size" as="xs:integer" select="3"/>

  <xsl:template match="/">
    <xsl:for-each-group select="items/item" group-adjacent="(position() - 1) idiv $chunk-size">
      <xsl:comment>Creating chunk-{position()}.xml</xsl:comment>
      <xsl:message>Creating chunk-{position()}.xml</xsl:message>
      <xsl:result-document href="chunk-{position()}.xml">
        <chunk number="{position()}">
          <xsl:sequence select="current-group()"/>
        </chunk>
      </xsl:result-document>
    </xsl:for-each-group>
  </xsl:template>

</xsl:stylesheet>