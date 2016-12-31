<?xml version="1.0" encoding="ISO-8859-1"?> 
<xsl:stylesheet version="1.0" xmlns:xsl = "http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="utf-8" indent="yes" />
<xsl:template match = "/">
    <html>
    <head></head>
    <body>
        <xsl:for-each select = "PhotoOrders/outlet">
            <P ALIGN = "CENTER">
                <BR/><xsl:value-of select = "name"/>
                <BR/><xsl:value-of select = "address"/>
                <BR/><xsl:value-of select = "city"/>,
                     <xsl:value-of select = "state"/>
                     <xsl:value-of select = "zip"/>
                <BR/><xsl:value-of select = "phone"/>
                <BR/><xsl:value-of select = "date"/> /
                     <xsl:value-of select = "time"/>
            </P>
        </xsl:for-each>    

        <xsl:for-each select = "PhotoOrders/customer">
            <P ALIGN = "LEFT">
                <BR/><b>Customer Name:</b>
                <BR/><xsl:value-of select = "firstname"/>
                <xsl:value-of select = "lastname"/>
                <BR/><xsl:value-of select = "address"/>
                <BR/><xsl:value-of select = "city"/>
                     <xsl:value-of select = "state"/>
                     <xsl:value-of select = "zip"/>
                <BR/><xsl:value-of select = "phone"/>    
                <BR/><xsl:value-of select = "email"/> 
            </P>        
        </xsl:for-each>
        <xsl:for-each select = "customer/orders[@type = 'first']">
            <P ALIGN = "CENTER">
                <BR/>
                <pre>
<b>Photo Medium</b>      <b>Copies</b>       <b>Size</b>        <b>Finishing</b>        <b>Urgency</b> 
<xsl:value-of select = "typeofmedium"/>   <xsl:value-of select = "numofcopies"/>   <xsl:value-of select = "sizeofphoto"/>   <xsl:value-of select = "typeoffinishing"/>   <xsl:value-of select = "urgency"/>
                </pre>
            </P>
        </xsl:for-each>
        <xsl:for-each select = "customer/orders[@type = 'second']">
            <P ALIGN = "CENTER">
                <pre>
<xsl:value-of select = "typeofmedium"/>   <xsl:value-of select = "numofcopies"/>   <xsl:value-of select = "sizeofphoto"/>   <xsl:value-of select = "typeoffinishing"/>   <xsl:value-of select = "urgency"/>
                </pre>
            </P>
        </xsl:for-each>
    </body>
    </html>

</xsl:template>
</xsl:stylesheet>
