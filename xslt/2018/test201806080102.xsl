<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:import href="test201806080202.xsl" />
    <xsl:param name="externalDoc" select="/.."/>
    <xsl:output method="html"></xsl:output>
    <xsl:template match="/">
        <h1>
            <xsl:value-of select="/catalog/@name"></xsl:value-of>
        </h1>
        <xsl:call-template name="dropdown">
            <xsl:with-param name="listname">xyz</xsl:with-param>
            <xsl:with-param name="value" select="/catalog/@name"/>
        </xsl:call-template>
    </xsl:template>
</xsl:stylesheet>