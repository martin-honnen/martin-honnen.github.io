<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:user="http://example.com/user-functions"
    exclude-result-prefixes="msxsl user"
    version="1.0">
    
    <msxsl:script language="JScript" implements-prefix="user">
        function escapeLineBreaks(input) {
          if (typeof input != 'string') {
            input = input.item(0).text;
          }
          return input.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
        }
    </msxsl:script>
    
    <xsl:template match="/">
        <html>
            <body>
                <table>
                    <tr id="row1">
                        <td>a</td>
                        <td></td>
                    </tr>
                </table>
                <script>
                    document.getElementById('row1').cells[1].innerHTML = "<xsl:value-of select="user:escapeLineBreaks(book/content)"/>";
                </script>
            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>
