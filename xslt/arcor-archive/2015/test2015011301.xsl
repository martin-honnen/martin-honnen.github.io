<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="utf-8" indent="yes"
    version="5.0"
    doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html>
        <head>
        </head>
        <body>
        <xsl:for-each select="lesson_resource">
            <div class="page">
                <img src="../pictures/logo.png" style="height:100px; padding-right:20px;"/>
                <h3 style="display:inline-block;"><xsl:value-of select="@name" /></h3>
                <div style="float:right;">http://www.mywebsite.com</div>
                <div><iframe width="100%" height="100%" src="data:text/html,{@help}"/></div>
            </div>      
        </xsl:for-each>
        </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
