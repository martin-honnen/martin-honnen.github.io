<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output encoding="UTF-8" method="xml" indent="yes"/>

    <xsl:param name="blah" select="'This is a test'"/>

    <xsl:template match="bar">
        <option value="text()">
            <xsl:value-of select="text()"/>
        </option>
    </xsl:template>

    <xsl:template match="foo">
        <select id="bars">
            <xsl:apply-templates select="bar"/>
        </select>
    </xsl:template>


    <xsl:template match="/">
        <html>
            <head>
                <title>Foo</title>
            </head>

            <body>
                <div id="foo">
                    <xsl:apply-templates select="foo"/>
                </div>
                <div>blah: <xsl:apply-templates select="$blah"/></div>

            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>