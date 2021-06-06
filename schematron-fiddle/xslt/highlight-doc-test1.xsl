<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:svrl="http://purl.oclc.org/dsdl/svrl"
                xmlns:f="internal"
                exclude-result-prefixes="#all"
                expand-text="yes">

    <xsl:import href="../../xsl/highlight-source-doc.xsl"/>

    <xsl:param name="svrl" >
        <svrl:schematron-output xmlns:error="https://doi.org/10.5281/zenodo.1495494#error" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sch="http://purl.oclc.org/dsdl/schematron" xmlns:schxslt-api="https://doi.org/10.5281/zenodo.1495494#api" xmlns:schxslt="https://doi.org/10.5281/zenodo.1495494" xmlns:svrl="http://purl.oclc.org/dsdl/svrl" xmlns:xs="http://www.w3.org/2001/XMLSchema">
            <svrl:metadata xmlns:dct="http://purl.org/dc/terms/" xmlns:skos="http://www.w3.org/2004/02/skos/core#">
                <dct:creator>
                    <dct:Agent>
                        <skos:prefLabel>Saxon-JS/2.2</skos:prefLabel>
                    </dct:Agent>
                </dct:creator>
                <dct:created>2021-06-06T09:07:13.499+02:00</dct:created>
                <dct:source>
                    <rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/">
                        <dct:creator>
                            <dct:Agent>
                                <skos:prefLabel>SchXslt/1.7.2 Saxon-JS/2.2</skos:prefLabel>
                                <schxslt.compile.typed-variables xmlns="https://doi.org/10.5281/zenodo.1495494#">true</schxslt.compile.typed-variables>
                            </dct:Agent>
                        </dct:creator>
                        <dct:created>2021-06-06T09:07:12.944+02:00</dct:created>
                    </rdf:Description>
                </dct:source>
            </svrl:metadata>
            <svrl:active-pattern documents="https://martin-honnen.github.io/schematron-fiddle/schxslt/1.7.2/run-pipeline-for-svrl-and-apply-to-schema.sef.json"/>
            <svrl:fired-rule context="book"/>
            <svrl:fired-rule context="book"/>
            <svrl:successful-report location="/Q{{}}books[1]/Q{{}}book[2]" test="@price &gt; 1000">
                <svrl:text>The book price is too big</svrl:text>
            </svrl:successful-report>
            <svrl:fired-rule context="book"/>
            <svrl:failed-assert location="/Q{{}}books[1]/Q{{}}book[3]" test="@price &gt; 10">
                <svrl:text>The book price is too small</svrl:text>
            </svrl:failed-assert>
            <svrl:fired-rule context="book"/>
        </svrl:schematron-output>
    </xsl:param>

    <xsl:key name="svrl-failed-asserts" match="svrl:failed-assert" use="@location"/>

    <xsl:key name="svrl-reported-tests" match="svrl:successful-report" use="@location"/>

    <xsl:param name="color-theme" select="'light'"/>

    <xsl:variable name="css-inline" select="'yes'"/>

    <xsl:output method="html" indent="yes" html-version="5.0"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Highlighting test</title>
                <style xsl:expand-text="no">
                    .element { display: inline; }

                    .assert { border-inline: 3px solid red; }

                    element.assert::before {
                    content: "❗";
                    }

                    .test { border-inline: 3px solid green; }

                    .element.test::before {
                    content: "✅";
                    }
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

    <xsl:template name="add-svrl" match="*">
        <xsl:message terminate="yes" select="."/>
    </xsl:template>

    <xsl:template mode="add-svrl" match="*:span[key('svrl-failed-asserts', @data-xpath, $svrl), key('svrl-reported-tests', @data-xpath, $svrl)]">
        <xsl:comment>@data-xpath: {@data-xpath}</xsl:comment>
        <xsl:copy>
            <xsl:attribute name="title" select="key('svrl-failed-asserts', @data-xpath, $svrl)!(@location, *), key('svrl-reported-tests', @data-xpath, $svrl)!(@location, *)"/>
            <xsl:attribute name="class" select="@class, if (key('svrl-failed-asserts', @data-xpath, $svrl)) then 'assert' else if (key('svrl-reported-tests', @data-xpath, $svrl)) then 'test' else()"/>
            <xsl:copy-of select="@* except @class"/>
            <xsl:apply-templates mode="#current"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="/" name="xsl:initial-template">
        <xsl:next-match/>
        <xsl:comment xmlns:saxon="http://saxon.sf.net/">Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
    </xsl:template>

</xsl:stylesheet>