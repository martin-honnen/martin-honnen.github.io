<?xml version="1.0" encoding="UTF-8" ?>
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html" doctype-public="about:legacy-compat" encoding="UTF-8" indent="yes" />
    <xsl:strip-space elements="*"/>

    <xsl:template match="/">
      <html>
        <head>
          <title>data URI test</title>
        </head>
        <body>
          <xsl:apply-templates/>
        </body>
      </html>
    </xsl:template>

    <xsl:template match="catalogue">
        <table>
            <thead>
                <xsl:apply-templates select="item[1]" mode="header"/>
            </thead>
            <tbody>
                <xsl:apply-templates/>
            </tbody>
        </table>
    </xsl:template>
    
    <xsl:template match="item" mode="header">
        <tr>
            <xsl:apply-templates mode="header"/>
        </tr>
    </xsl:template>
    
    <xsl:template match="item/*" mode="header">
        <th>
            <xsl:value-of select="local-name()"/>
        </th>
    </xsl:template>
    
    <xsl:template match="item">
        <tr>
            <xsl:apply-templates/>
        </tr>
    </xsl:template>
    
    <xsl:template match="item/*">
        <td>
            <xsl:value-of select="."/>
        </td>
    </xsl:template>
    
    <xsl:template match="item/image">
        <td>
            <img src="data:image/png;base64,{.}"/>
        </td>
    </xsl:template>
    
</xsl:transform>
