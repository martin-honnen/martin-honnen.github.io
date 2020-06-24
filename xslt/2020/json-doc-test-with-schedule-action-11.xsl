<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="3.0"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:array="http://www.w3.org/2005/xpath-functions/array"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    expand-text="yes"
    exclude-result-prefixes="#all">

  <xsl:output method="adaptive" build-tree="no"/>

  <xsl:param name="url" as="xs:string">https://swapi.dev/api/people/</xsl:param>

  <xsl:template name="xsl:initial-template">
    <xsl:param name="url" as="xs:string" select="$url"/>
    <ixsl:schedule-action document="{$url}">
      <xsl:call-template name="output-json">
        <xsl:with-param name="url" select="$url"/>
      </xsl:call-template>
    </ixsl:schedule-action>
  </xsl:template>

  <xsl:template name="output-json">
    <xsl:param name="url" select="$url"/>
    <xsl:variable name="json-from-server" select="json-doc($url)"/>
    <xsl:result-document href="#results-list" method="ixsl:append-content">
      <xsl:iterate select="$json-from-server?results ! array:flatten(.)">
        <li>
          {?name}
        </li>
      </xsl:iterate>
    </xsl:result-document>
    <xsl:if test="$json-from-server?next">    
        <xsl:call-template name="xsl:initial-template">
          <xsl:with-param name="url" select="$json-from-server?next => replace('http:', 'https:')"/>
        </xsl:call-template>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>