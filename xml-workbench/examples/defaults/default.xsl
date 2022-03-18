<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="3.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                exclude-result-prefixes="#all"
                expand-text="yes">

    <xsl:output method="html" indent="yes" html-version="5"/>

    <xsl:mode on-no-match="shallow-copy"/>

    <xsl:template match="/" name="xsl:initial-template">
        <xsl:next-match/>
        <xsl:comment>Run with {system-property('xsl:product-name')} {system-property('xsl:product-version')} {system-property('Q{http://saxon.sf.net/}platform')}</xsl:comment>
    </xsl:template>

</xsl:stylesheet>
