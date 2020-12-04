<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="utf-8"/>
    <xsl:template match="/">
        <html>
            <head> <title> <xsl:value-of select="root/@title"/> </title> 
                <meta   http-equiv='X-UA-Compatible' content='IE=8'/> </head>
            <body>
                <xsl:value-of select="root/mydata/text()"/>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
