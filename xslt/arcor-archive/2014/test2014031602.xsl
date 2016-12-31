<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
            xmlns="http://www.w3.org/1999/xhtml"
            xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
            xmlns:x="http://example.com/products" exclude-result-prefixes="x">
<xsl:output method="xml" omit-xml-declaration="no" indent="yes"/>
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
