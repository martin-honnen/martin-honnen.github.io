<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mf="http://example.com/mf"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT" 
    exclude-result-prefixes="#all"
    expand-text="yes"
    version="3.0">
    
    <xsl:import href="construct-function.xsl"/>
    
    <xsl:template name="xsl:initial-template">
        <xsl:result-document href="#result">
            <h2>Example</h2>
            <p>{ixsl:window()?Date
                => mf:construct([])
                => ixsl:call('toUTCString', [])}</p>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>