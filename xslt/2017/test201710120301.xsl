<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" media-type="text/html" indent="yes" encoding="UTF-8"/>
    
    <xsl:variable name="fileA" select="document(/importFiles/docs/@fileA)" />
    <xsl:variable name="fileB" select="document(/importFiles/docs/@fileB)" />
    <xsl:template match="/">
        <html>
            <head>
                <title> 
                    Task1
                </title>
            </head>        
            <body>
                <table align="center" border="1">
                    <tr>
                        <th>column_1</th>
                        <th>column_2</th>
                    </tr>
                    
                    <xsl:for-each select="$fileA/numbers/number">
                        
                        <tr>                                  
                            <td class="_fileA"><xsl:value-of select="position()" /></td>
                            <td class="_fileB"><xsl:value-of select="$fileB//animal[position() = current()]" /></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html> 
    </xsl:template>
</xsl:stylesheet>