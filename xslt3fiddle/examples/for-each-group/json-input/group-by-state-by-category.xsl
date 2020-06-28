<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  version="3.0"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  exclude-result-prefixes="#all">

  <xsl:output method="json" indent="yes"/>

  <xsl:template match=".">
    <xsl:variable name="db" select="."/>
    <xsl:variable name="sales-by-state-by-category" as="map(*)">
      <xsl:map>
        <xsl:for-each-group select="?sales?*"
          group-by="$db?stores?*[.('store number') = current()('store number')]?state">
          <xsl:sort select="current-grouping-key()"/>
          <xsl:map-entry key="current-grouping-key()">
            <xsl:variable name="categories-of-state-group" as="map(*)*">
              <xsl:for-each-group select="current-group()" group-by="$db?products?*[?name = current()?product]?category">
                <xsl:map-entry key="current-grouping-key()">
                  <xsl:variable name="product-sales-of-state-and-cat" as="map(*)*">
                    <xsl:for-each-group select="current-group()" group-by="?product">
                      <xsl:map-entry key="current-grouping-key()" select="sum(current-group()?quantity)"/>
                    </xsl:for-each-group>                   
                  </xsl:variable>
                  <xsl:sequence select="array { map:merge($product-sales-of-state-and-cat) }"/> 
                </xsl:map-entry>
              </xsl:for-each-group>              
            </xsl:variable>
            <xsl:sequence select="array { map:merge($categories-of-state-group) }"/>
          </xsl:map-entry>
        </xsl:for-each-group>
      </xsl:map>
    </xsl:variable>
    <xsl:sequence select="$sales-by-state-by-category"/>

  </xsl:template>

</xsl:stylesheet>
