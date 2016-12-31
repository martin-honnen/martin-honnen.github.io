<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
   <html lang="en" xml:lang="en">
     <head>
        <title> People Report: <xsl:value-of select="/people/list-name" />
        </title>
        <style type="text/css">h1 { text-align: center }</style>
     </head>
     <body>
      
        <h1> People Report: <xsl:value-of select="/people/list-name" /> </h1>
      

      <table border="1" align="center">
       <tr>
         <td>Last Name</td>
         <td>First Name</td>
         <td>Account Number</td>
         <td>Favorite Color</td>
       </tr>
       <xsl:apply-templates select="/people/person" />
      </table>

    </body>
   </html>
 </xsl:template>


<xsl:template match="person">
 <tr>
  <td>
    <xsl:value-of select="name/last" />
  </td>
  <td>
    <xsl:value-of select="name/first" />
  </td>
  <td>
    <xsl:value-of select="acct-no" />
  </td>
  <td>
    <xsl:value-of select="fav-color" />
  </td>
</tr>
</xsl:template>

</xsl:stylesheet>
