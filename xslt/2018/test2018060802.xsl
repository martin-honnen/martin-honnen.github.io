<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html"></xsl:output>
    <xsl:template name="dropdown">
        <xsl:param name="listname"/>
        <xsl:param name="value"/>
        <select>
            <xsl:for-each select="document('subirtest201806/test2018060802.xml', /)/dropdowns/dropdown[@name=$listname]/option">
                <option>
                    <xsl:attribute name="value">
                        <xsl:value-of select="@value"/>
                    </xsl:attribute>
                    <xsl:value-of select="."/>
                </option>
            </xsl:for-each>
        </select>
    </xsl:template>
</xsl:stylesheet>
