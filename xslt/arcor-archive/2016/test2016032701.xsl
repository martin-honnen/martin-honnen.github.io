<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
<xsl:template match="/">
    <html> 
        <head> 
            <title>Customer</title> 
        </head> 
        <body> 
            <xsl:for-each select="//customer[@cid='1']">
            <xsl:value-of select="fname"/> <br/>
            <xsl:value-of select="lname"/> <br/>    
            </xsl:for-each>
        </body>
    </html>
</xsl:template> 
</xsl:stylesheet> 