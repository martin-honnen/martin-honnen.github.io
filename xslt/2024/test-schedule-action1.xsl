<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    xmlns="http://www.w3.org/1999/xhtml"
    exclude-result-prefixes="#all"
    expand-text="yes">
    
    <xsl:param name="doc-uris" as="xs:string*"
        select="(1 to 3)!('sample' || . || '.xml')"/>
        
    <xsl:template name="xsl:initial-template">
        <div>
            <input type="button" id="sched-action-test1" value="test schedule-action"/>
        </div>
        <div id="results"></div>
    </xsl:template>
    
    <xsl:template mode="ixsl:onclick" match="input[@id = 'sched-action-test1']">
        <ixsl:schedule-action document="{$doc-uris => string-join(' ')}">
            <xsl:call-template name="doc-processing-action">
                <xsl:with-param name="docs" select="$doc-uris"/>
            </xsl:call-template>
        </ixsl:schedule-action>       
    </xsl:template>
    
    <xsl:template name="doc-processing-action">
        <xsl:param name="docs"/>
        <xsl:if test="every $doc in $docs satisfies doc-available($doc)">
            <xsl:result-document href="#results" method="ixsl:append-content">
                <xsl:for-each select="$docs">
                    <pre>
                        <xsl:sequence select="serialize(doc(.))"/>
                    </pre>                   
                </xsl:for-each>
            </xsl:result-document>
        </xsl:if>
    </xsl:template>
    
</xsl:stylesheet>
