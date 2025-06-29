<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="#all"
    version="3.0">
    
    <xsl:param name="schema-uri" as="xs:string?" select="()"/>
    
    <xsl:param name="instance-uri" as="xs:string?" select="()"/>
    
    <xsl:param name="schema-text" as="xs:string?" select="()"/>
    
    <xsl:param name="instance-text" as="xs:string?" select="()"/>
    
    <xsl:import href="transpile.xsl"/>
    
    <xsl:output indent="yes"/>
    
    <xsl:variable name="compiled-schema">
        <xsl:variable name="schema"
            select="if (empty($schema-uri))
                    then parse-xml($schema-text)
                    else if (doc-available($schema-uri))
                    then doc($schema-uri)
                    else doc(resolve-uri($schema-uri, base-uri(/)))"/>
        <xsl:apply-templates select="$schema/node()"/>
    </xsl:variable>

    <xsl:template name="xsl:initial-template">
        <xsl:sequence
            select="if (empty($schema-uri))
                    then
                      transform(map {
                      'stylesheet-node' : $compiled-schema,
                      'source-node' : parse-xml($instance-text)
                      })?output
                    else
                      transform(map {
                      'stylesheet-node' : $compiled-schema,
                      'stylesheet-base-uri': $schema-uri,
                      'source-node' : parse-xml($instance-text)
                      })?output""/>
    </xsl:template>
    
    <xsl:template match="/">
        <xsl:sequence
            select="transform(map {
                      'stylesheet-node' : $compiled-schema,                     
                      'stylesheet-base-uri': $schema-uri,
                      'source-node' : .
                   })?output"/>
    </xsl:template>
    
</xsl:stylesheet>
