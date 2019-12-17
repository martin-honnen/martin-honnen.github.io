<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:math="http://www.w3.org/2005/xpath-functions/math"
	xmlns:map="http://www.w3.org/2005/xpath-functions/map"
	xmlns:array="http://www.w3.org/2005/xpath-functions/array"
	exclude-result-prefixes="#all"
	version="3.0">

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template match="/" name="xsl:initial-template">
    <xsl:iterate select="1 to 5">
       <xsl:result-document href="html-result-{.}.html" expand-text="yes">
         <html>
            <head>
               <title>HTML result {.}</title>
            </head>
            <body>
               <h1>HTML result {.}</h1>
            </body>
          </html>
          <xsl:comment>Run with .NET XSLT Fiddle, processor <xsl:value-of select="system-property('xsl:vendor')"/>
            <xsl:choose>
              <xsl:when test="number(system-property('xsl:version')) > 1">
                <xsl:value-of select="concat(' Product ', system-property('xsl:product-name'), ' ', system-property('xsl:product-version'))"/>
              </xsl:when>
              <xsl:when test="system-property('msxml:version')" xmlns:msxml="urn:schemas-microsoft-com:xslt">
                <xsl:text> </xsl:text>
                <xsl:value-of select="system-property('msxml:version')"/>
              </xsl:when>
            </xsl:choose>
          </xsl:comment>
        </xsl:result-document>
      </xsl:iterate>
   </xsl:template>
  
</xsl:stylesheet>
