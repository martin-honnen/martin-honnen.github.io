<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
            xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
            xmlns:x="http://example.com/products" exclude-result-prefixes="x">
<xsl:output method="html" version="5.0" omit-xml-declaration="yes" indent="yes"
    doctype-system="about:legacy-compat"/>
<xsl:template match="/">
    <!--  HTML page starts here  -->
    <html>
        <head>
            <title>Products Page</title>
        </head>
        <body>
            <h2>Products</h2>
            <ul>
                <xsl:for-each select="x:products/x:product">
                    <li>
                        <xsl:value-of select="x:productname"/>
                    </li>
                </xsl:for-each>
            </ul>
        </body>
    </html>
    <!--  HTML page ends here  -->
</xsl:template>
</xsl:stylesheet>
