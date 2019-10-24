<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:mf="http://example.com/mf"
    exclude-result-prefixes="msxsl mf">
    
    <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>
    
    <msxsl:script language="JScript" implements-prefix="mf">
        function test(input) {
          return (typeof input) + '; ' + input.length;
        }
    </msxsl:script>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Test</title>
            </head>
            <body>
                <h1>Test</h1>
                <section>
                    <h2>Test 1: pass single node</h2>
                    <code><xsl:value-of select="mf:test(*)"/></code>
                </section>
                <section>
                    <h2>Test 2: pass node-set of more than one node</h2>
                    <code><xsl:value-of select="mf:test(.//*)"/></code>
                </section>
            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>
