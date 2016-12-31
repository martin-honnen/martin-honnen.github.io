<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- pass in a string with a single id value for the parameters ids or a '|' separated list of ids -->
    <xsl:param name="ids" select="''"/>
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">

        <xsl:for-each select="products/test[$ids = '' or contains(concat('|', $ids, '|'), id)]">
            <a href="#"> Hello # <xsl:value-of select="value"/></a>
        </xsl:for-each>

    </xsl:template>
</xsl:stylesheet>