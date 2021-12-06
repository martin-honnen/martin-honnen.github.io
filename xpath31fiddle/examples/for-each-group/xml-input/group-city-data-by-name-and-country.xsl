<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	exclude-result-prefixes="#all"
	version="3.0">

  <xsl:output method="html" indent="yes" html-version="5"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Simple group-by example with a composite grouping key from XSLT 3 specification</title>
      </head>
      <body>
        <xsl:for-each-group select="cities/city" 
                            group-by="@name, @country" 
                            composite="yes">
          <p>
            <xsl:value-of select="current-grouping-key()[1] || ', ' ||
                                  current-grouping-key()[2] || ': ' || 
                                  avg(current-group()/@pop)"/>
          </p>
        </xsl:for-each-group>          
      </body>
    </html>
  </xsl:template>
  
</xsl:stylesheet>
