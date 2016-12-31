<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" />

    <xsl:template match="/">
    <html>
        <head>
            <title>Czołgi: Transformacja 2</title>
        </head>
        <body>
            <h2>Czołgi</h2><br/>
            <xsl:apply-templates select="czolgi/czolg">
                <xsl:sort select="info_dodatkowe/rok_wprowadzenia"/>
            </xsl:apply-templates>
        </body>
    </html>
</xsl:template>

<xsl:template match="czolg">
    <xsl:number value="position()" format="1"/>. Nazwa: <xsl:value-of select="nazwa"/><br/>
    Kraj pochodzenia: <xsl:value-of select="@kraj_pochodzenia"/>
    Typ:        <xsl:choose>
                    <xsl:when test="@typ='lekki'">Lekki</xsl:when>
                    <xsl:when test="@typ='sredni'">Średni</xsl:when>
                    <xsl:when test="@typ='ciezki'">Ciężki</xsl:when>
                </xsl:choose><br/>
    Rok wprowadzenia: <xsl:value-of select="info_dodatkowe/rok_wprowadzenia"/><br/>

    <br/>
</xsl:template>

</xsl:stylesheet>
