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

  <xsl:param name="result-uri" as="xs:string">result-seq</xsl:param>

  <xsl:template name="xsl:initial-template">
    <xsl:param name="result" select="()"/>
    <xsl:param name="url" as="xs:string" select="$url"/>
    <ixsl:schedule-action document="{$url}">
      <xsl:call-template name="output-json">
        <xsl:with-param name="url" select="$url"/>
        <xsl:with-param name="result" select="$result"/>
      </xsl:call-template>
    </ixsl:schedule-action>
  </xsl:template>

  <xsl:template name="output-json">
    <xsl:param name="url" select="$url"/>
    <xsl:param name="result" select="()"/>
    <xsl:variable name="json-from-server" select="json-doc($url)"/>
    <xsl:choose>
      <xsl:when test="not($json-from-server?next)">
        <xsl:result-document href="#results" method="ixsl:append-content">
          <ul>
            <xsl:iterate select="($result, $json-from-server?results) ! array:flatten(.)">
              <li>
                {?name}
              </li>
            </xsl:iterate>
          </ul>
        </xsl:result-document>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="xsl:initial-template">
          <xsl:with-param name="url" select="$json-from-server?next => replace('http:', 'https:')"/>
          <xsl:with-param name="result" select="$result, $json-from-server?results"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>