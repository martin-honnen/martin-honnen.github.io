<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" indent="yes" version="5.0"/>

<xsl:template match="/">
  <section>
    <h2>Family Members</h2>
    <table id="tbl" border="1" style ="display:none">
      <thead>
       <tr>
        <th>Role</th> <th>Name</th> <th>Age</th>
       </tr>      
      </thead>
      <tbody>
       <xsl:for-each select="family/person">
        <tr>
         <xsl:for-each select="*"> 
           <td><xsl:value-of select="."/></td>
         </xsl:for-each>     
        </tr>
        </xsl:for-each>      
      </tbody>
    </table>
    <script>document.getElementById('tbl').style.display = 'none';</script>
  </section>
</xsl:template>

</xsl:stylesheet>
