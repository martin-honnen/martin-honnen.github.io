<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="1.0">
  
<xsl:param name="nl" select="'&#10;'"/>
<xsl:param name="sep" select="','"/>

<xsl:output method="text"/>
<xsl:strip-space elements="*"/>

<xsl:template match="/">
  <xsl:apply-templates select="root/record[1]/*" mode="cols"/>
  <xsl:value-of select="$nl"/>
  <xsl:apply-templates select="root/record"/>
</xsl:template>

<xsl:template match="record/*" mode="cols">
  <xsl:if test="position() > 1">
    <xsl:value-of select="$sep"/>
  </xsl:if>
  <xsl:value-of select="local-name()"/>
</xsl:template>

<xsl:template match="record">
  <xsl:apply-templates/>
  <xsl:value-of select="$nl"/>
</xsl:template>

<xsl:template match="record/*">
  <xsl:if test="position() > 1">
    <xsl:value-of select="$sep"/>
  </xsl:if>
  <xsl:value-of select="."/>
</xsl:template>

</xsl:stylesheet>