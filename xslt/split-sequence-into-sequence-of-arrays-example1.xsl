<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:mf="http://example.com/mf"
    exclude-result-prefixes="#all"
    expand-text="yes">
    
    <xsl:import href="split-sequence-into-sequence-of-arrays.xsl"/>
    
    <xsl:param name="chunk-size" as="xs:integer" select="3"/>
    
    <xsl:output method="xml" indent="yes"/>
    
    <xsl:template match="root">
        <xsl:copy>
            <xsl:apply-templates select="mf:group-chunks(item, $chunk-size)"/>      
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match=".[. instance of array(*)]">
        <chunk index="{position()}">
            <xsl:sequence select="?*"/>
        </chunk>
    </xsl:template>
    
    <xsl:template match="/">
        <xsl:next-match/>
        <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
    </xsl:template>
    
</xsl:stylesheet>