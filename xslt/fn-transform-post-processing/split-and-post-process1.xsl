<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  exclude-result-prefixes="#all"
  expand-text="yes">

  <xsl:param name="primary-sheet" as="xs:string">split1.xsl</xsl:param>

  <xsl:param name="sheet-uris" as="xs:string*" select="'sheet1.xsl', 'sheet2.xsl', 'sheet3.xsl', 'sheet4.xsl'"/>

  <xsl:param name="chunk-size" as="xs:integer" select="10"/>

  <xsl:output indent="yes"/>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:apply-templates
      select="transform(
                map {
                 'source-node' : .,
                 'stylesheet-location' : $primary-sheet,
                 'stylesheet-params' : map {
                   QName('', 'chunk-size') : $chunk-size
                 },
                 'delivery-format' : 'document',
                 'post-process' : function($uri, $result) { 
                   fold-left(
                     $sheet-uris,
                     $result,
                     function($result2, $sheet) {
                       transform(map { 
                         'source-node' : $result2, 
                         'stylesheet-location' : $sheet, 
                         'delivery-format' : 'document'
                       })?output
                     }
                   )
                  }                  
                }
              )"/>
    <xsl:comment>Run with {static-base-uri()} using {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')} at {current-dateTime()}</xsl:comment>
  </xsl:template>

  <xsl:template match=".[. instance of map(*)]">
    <xsl:variable name="result-documents-map" select="."/>
    <xsl:for-each select="map:keys($result-documents-map)">
      <xsl:result-document href="{.}">
        <xsl:sequence select="$result-documents-map(.)"/>
      </xsl:result-document>
    </xsl:for-each>
  </xsl:template>
  
</xsl:stylesheet>