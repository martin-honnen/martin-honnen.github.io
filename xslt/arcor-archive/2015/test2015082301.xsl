<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml"
    version="1.0">

    <xsl:output 
        method="xml" 
        indent="yes"
        encoding="UTF-8"
        omit-xml-declaration="yes"
        doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" 
        doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"/>

    <xsl:strip-space elements="*"/>


    <xsl:template match="/">
            <html>
                <head>
                    <title>Example</title>                
                </head>            
                <body>
                    <xsl:apply-templates select="//container-content/*"/>
                </body>
            </html>
    </xsl:template>
    
<xsl:template match="*">
  <xsl:element name="{local-name()}"><!-- assumes you have the namespace declaration suggested above -->
   <xsl:apply-templates/>
  </xsl:element>
</xsl:template>

</xsl:stylesheet>