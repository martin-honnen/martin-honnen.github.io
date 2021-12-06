<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="#all"
    version="3.0">
    
    <xsl:param name="method" as="xs:string" static="yes" select="'json'"/>
    
    <xsl:param name="xslt-uri" static="yes" as="xs:string?" select="'group-sales-sum-product.xsl'"/>
    
    <xsl:include _href="{$xslt-uri}"/>
    
    <xsl:param name="json-uri" as="xs:string?" select="'sales.json'"/>
    
    <xsl:param name="json-content" as="xs:string?" select="()"/>
    
    <xsl:variable name="input" as="item()" select="if (not(empty($json-uri))) then json-doc($json-uri) else parse-json($json-content)"/>
    
    <xsl:output _method="{$method}" indent="yes"/>
    
    <xsl:template name="xsl:initial-template">
        <xsl:apply-templates select="$input"/>
    </xsl:template>
    
</xsl:stylesheet>