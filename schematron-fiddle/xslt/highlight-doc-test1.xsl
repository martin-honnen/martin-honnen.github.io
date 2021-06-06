<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                xmlns:f="internal"
                exclude-result-prefixes="#all"
                expand-text="yes">

    <xsl:import href="../../xsl/highlight-source-doc.xsl"/>

    <xsl:param name="svrl" as="document-node()" select="/"/>

    <xsl:variable name="assertions" select="$svrl//svrl:failed-assert"/>
    <xsl:variable name="reports" select="$svrl//svrl:successful-report"/>

    <xsl:param name="color-theme" select="'light'"/>

    <xsl:variable name="css-inline" select="'yes'"/>

    <xsl:output method="html" indent="yes" html-version="5.0"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Highlighting test</title>
                <style xsl:expand-text="no">
                    .assert { background-color: red; }
                    .test { background-color: green; }
                </style>
            </head>
            <body>
                <section>
                    <xsl:variable name="marked-up-spans" select="f:render-tree(.)"/>
                    <xsl:variable name="added-svrl-classes">
                        <xsl:apply-templates mode="add-svrl" select="$marked-up-spans"/>
                    </xsl:variable>
                    <pre><xsl:sequence select="$added-svrl-classes/node()"/></pre>
                </section>
            </body>
        </html>
    </xsl:template>

    <xsl:mode name="add-svrl" on-no-match="shallow-copy"/>

    <xsl:template match="*:span[@data-xpath = ($assertions/@location, $reports/@location)]">
        <xsl:copy>
            <xsl:attribute name="class" select="@class, if (@data-xpath = $assertions/@location) then '.assert' else if (@data-xpath = $reports/@location) then '.test' else()"/>
            <xsl:copy-of select="@* except @class"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="/" name="xsl:initial-template">
        <xsl:next-match/>
        <xsl:comment xmlns:saxon="http://saxon.sf.net/">Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
    </xsl:template>

</xsl:stylesheet>