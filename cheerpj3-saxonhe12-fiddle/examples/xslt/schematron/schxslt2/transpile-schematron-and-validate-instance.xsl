<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="#all"
    version="3.0">
    
    <xsl:param name="schema-uri" as="xs:string?" select="resolve-uri('price.sch', base-uri(/))"/>
    
    <xsl:import href="transpile.xsl"/>
    
    <xsl:output method="xml" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:variable name="transpiled-schematron">
            <xsl:apply-templates select="doc($schema-uri)/node()"/>
        </xsl:variable>
        <xsl:sequence
            select="transform(map {
            'stylesheet-node' : $transpiled-schematron,                     
            'stylesheet-base-uri': $schema-uri,
            'source-node' : .
            })?output"/>
        <xsl:comment expand-text="yes">Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} at {current-dateTime()}</xsl:comment>
    </xsl:template>
    
</xsl:stylesheet>
