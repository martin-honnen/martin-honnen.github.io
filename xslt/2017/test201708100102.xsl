<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:math="http://www.w3.org/2005/xpath-functions/math" exclude-result-prefixes="xs math"
    expand-text="yes" version="3.0">

    <xsl:param name="sortkey" as="xs:string" select="'year'"/>

    <xsl:mode on-no-match="shallow-skip"/>

    <xsl:output method="html" html-version="5.0" indent="yes"/>

    <xsl:template match="list">
        <xsl:result-document href="#output">
            <table>
                <thead>
                    <tr>
                        <xsl:apply-templates select="record[1]/*" mode="th"/>
                    </tr>
                </thead>
                <tbody>
                    <xsl:apply-templates select="record">
                        <xsl:sort>
                            <xsl:evaluate xpath="$sortkey" context-item="."/>
                        </xsl:sort>
                    </xsl:apply-templates>
                </tbody>
            </table>
        </xsl:result-document>
    </xsl:template>

    <xsl:template match="record/*" mode="th">
        <th>{.}</th>
    </xsl:template>

    <xsl:template match="record">
        <tr>
            <xsl:apply-templates/>
        </tr>
    </xsl:template>

    <xsl:template match="reord/*">
        <td>{.}</td>
    </xsl:template>

</xsl:stylesheet>
