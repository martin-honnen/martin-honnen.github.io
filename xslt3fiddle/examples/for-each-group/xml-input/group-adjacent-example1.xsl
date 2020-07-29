<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	exclude-result-prefixes="#all"
	version="3.0">

  <xsl:mode on-no-match="shallow-copy"/>

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Simple group-adjacent grouping example from the XSLT 3 specification</title>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="p">
        <xsl:for-each-group select="node()" 
                group-adjacent="self::ul or self::ol">
            <xsl:choose>
                <xsl:when test="current-grouping-key()">
                    <xsl:copy-of select="current-group()"/>  
                </xsl:when>
                <xsl:otherwise>
                    <p>
                        <xsl:copy-of select="current-group()"/>
                    </p>
                </xsl:otherwise>  
            </xsl:choose>
        </xsl:for-each-group>
  </xsl:template>
  
</xsl:stylesheet>
