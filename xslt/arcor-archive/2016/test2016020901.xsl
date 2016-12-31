<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    
<xsl:output method="html"/>

<xsl:template match="/">
        <xsl:apply-templates select="//DETAIL"/>
</xsl:template>

<xsl:template match="DETAIL">
    <br/>Current: <xsl:value-of select="@Name"/>
    <br/>Ancestor: <xsl:value-of select="../../@Name"/>
</xsl:template>

</xsl:stylesheet>