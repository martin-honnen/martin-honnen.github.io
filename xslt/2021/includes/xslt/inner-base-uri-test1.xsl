<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="#all"
    version="3.0">
    
    <xsl:template match="uri">
        <xsl:comment>nested stylesheet module</xsl:comment>
        <xsl:copy>
            <xsl:attribute name="static-base-uri" select="static-base-uri()"/>
            <xsl:attribute name="base-uri" select="base-uri()"/>
            <xsl:attribute name="resolve-uri" select="resolve-uri(.)"/>
            <xsl:apply-templates/>
        </xsl:copy>
    </xsl:template>
    
</xsl:stylesheet>