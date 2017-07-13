<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:math="http://www.w3.org/2005/xpath-functions/math"
    xmlns:f2="http://example.com/f2"
    exclude-result-prefixes="xs math f2"
    version="3.0">
    
    <xsl:param name="input" as="xs:string" select="'John Doe'"/>
    
    <xsl:variable name="module2" as="map(*)" select="load-xquery-module('http://example.com/f2', map { 'location-hints' : 'module2.xquery' })"/>
    
    <xsl:variable name="f2:bar" as="function(*)" select="$module2?functions(xs:QName('f2:bar'))?1"/>
    
    <xsl:output method="adaptive"/>
    
    <xsl:template name="xsl:initial-template" match="/">
        <xsl:sequence select="$f2:bar($input)"/>
    </xsl:template>
    
</xsl:stylesheet>