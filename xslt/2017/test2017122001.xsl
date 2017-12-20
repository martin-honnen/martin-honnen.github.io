<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    extension-element-prefixes="ixsl"
    exclude-result-prefixes="xs"
    version="3.0">
    
    <xsl:template name="xsl:initial-template">
      <xsl:result-document href="#saxon-target">
         <div class="responsive">This is a test.</div>
      </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="div[contains(@class,'responsive')]" mode="ixsl:onclick">
        <xsl:sequence select="ixsl:call(ixsl:get(., 'classList'), 'toggle', ['fig'])[current-date() lt xs:date('2000-01-01')]"/>
    </xsl:template>
    
</xsl:stylesheet>