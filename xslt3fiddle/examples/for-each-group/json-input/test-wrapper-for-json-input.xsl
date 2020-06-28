<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="#all"
    version="3.0">
    
    <xsl:param name="method" as="xs:string" static="yes" select="'json'"/>
    
    <xsl:param name="xslt-uri" as="xs:string"/>
    
    <xsl:param name="json-uri" as="xs:string?" select="()"/>
    
    <xsl:param name="json-content" as="xs:string?" select="()"/>
    
    <xsl:variable name="input" as="item()" select="if (not(empty($json-uri))) then json-doc($json-uri) else parse-json($json-content)"/>
    
    <xsl:output _method="{$method}" indent="yes"/>
    
    <xsl:template name="xsl:initial-template">
        <xsl:sequence
            select="transform( 
                        map {
                          'stylesheet-location' : $xslt-uri,
                          'global-context-item' : $input,
                          'initial-match-selection' : $input,
                          'delivery-format' : 'raw'
                        }
                    )?output"/>
    </xsl:template>
    
</xsl:stylesheet>