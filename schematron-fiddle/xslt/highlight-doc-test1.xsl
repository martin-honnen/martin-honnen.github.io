<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:f="internal"
                exclude-result-prefixes="#all"
                expand-text="yes">

    <xsl:import href="../../xsl/highlight-source-doc.xsl"/>

    <xsl:param name="color-theme" select="'light'"/>

    <xsl:variable name="css-inline" select="'yes'"/>

    <xsl:output method="html" indent="yes" html-version="5.0"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>XMLSpectrum test</title>
            </head>
            <body>
                <h1>XMLSpectrum test</h1>
                <section>
                    <pre><xsl:sequence select="f:render-tree(.)"/></pre>
                </section>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="/" name="xsl:initial-template">
        <xsl:next-match/>
        <xsl:comment xmlns:saxon="http://saxon.sf.net/">Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
    </xsl:template>

</xsl:stylesheet>