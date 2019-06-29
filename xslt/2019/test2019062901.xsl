<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">

  <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>

  <xsl:param name="groupSize" select="3"/>
  <xsl:param name="tableId" select="'pers-table'"/>

  <xsl:variable name="totRcrdNr" select="count(/persons/person)"/>
  <xsl:variable name="lastPage" select="ceiling($totRcrdNr div $groupSize)"/>
  
  <xsl:template match="persons">
      <section>
          <h2>Some persons listing</h2>
          <table id="{$tableId}" border="1" style="border-collapse:collapse;width:42%">
              <thead>
                  <tr bgcolor="#b0d2b8">
                    <th>Surname</th> <th>Name</th> <th>Age</th> <th>Address</th> <th>City</th>
                  </tr>
              </thead>
              <xsl:apply-templates select="person[position() mod $groupSize = 1]" mode="page"/>
              <tfoot>
                <tr class="tln"> 
                 <td colspan="3">
                  
                 <span class="bpgn" style="margin-left:95px">  <!-- PREVIOUS and FIRST-->
                 <a href="#" onclick="displayPage(1); return false;">&#171; </a>  <!-- << -->
                 &#160;<a href="#" onclick="displayPage(page - 1); return false;">&#8249; </a> <!-- < -->      
                 </span>     
                 </td>
                 <td>  
                  <span class="bpgn" style="margin-left:16px">    <!-- NEXT and LAST-->
                   <a href="#" onclick="displayPage(page + 1); return false;">&#8250; </a> <!-- > -->
                   &#160;<a href="#" onclick="displayPage(); return false;">&#187; </a>  <!-- >> -->      
                  </span>     
                 </td>   
                 <td>pag: <span id="page">1</span>/<xsl:value-of select="$lastPage"/> </td>
                </tr>                  
              </tfoot>
          </table>
          <script>
              var page = 1;
              var lastPage = <xsl:value-of select="$lastPage"/>;
              
              var table = document.getElementById('<xsl:value-of select="$tableId"/>');
              
              function displayPage(pageNr) {
                 page = pageNr;
                 table.tBodies[page - 1].display = '';
                 Array.from(table.tBodies).filter((el, i) => i != (page - 1)).forEach(el => el.style.display = 'none'); 
              }
              
              displayPage(1);
          </script>
      </section>
  </xsl:template>
  
  <xsl:template match="person" mode="page">
      <tbody>
          <xsl:apply-templates select=". | following-sibling::person[position() &lt; $groupSize]"/>
      </tbody>
  </xsl:template>
  
  <xsl:template match="person">
      <tr>
          <xsl:apply-templates/>
      </tr>
  </xsl:template>
  
  <xsl:template match="person/*">
      <td>
          <xsl:apply-templates/>
      </td>
  </xsl:template>

</xsl:stylesheet>
