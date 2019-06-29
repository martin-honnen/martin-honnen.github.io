<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">

  <xsl:output method="html" indent="yes" version="5" doctype-system="about:legacy-doctype"/>

  <xsl:param name="currentPage" select="1"/>
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
              <xsl:apply-templates select="person[position() mod $groupSize = 1][position() = $currentPage]" mode="page"/>
              <tfoot>
                <tr class="tln"> 
                 <td colspan="3">
                  
                 <span class="bpgn" style="margin-left:95px">  <!-- PREVIOUS and FIRST-->
                 <button id="first-page" onclick="transform('test2019062901.xml', 'test2019062902.xsl', {{ currentPage: 1, groupSize: {$groupSize} }}, document.getElementById('xslt-target'));">&#171; </button>  <!-- << -->
                 &#160;<button id="previous-page" onclick="transform('test2019062901.xml', 'test2019062902.xsl', {{ currentPage: { $currentPage - 1 }, groupSize: {$groupSize} }}, document.getElementById('xslt-target'));">&#8249; </button> <!-- < -->      
                 </span>     
                 </td>
                 <td>  
                  <span class="bpgn" style="margin-left:16px">    <!-- NEXT and LAST-->
                   <button id="next-page" onclick="transform('test2019062901.xml', 'test2019062902.xsl', {{ currentPage: { $currentPage + 1 }, groupSize: {$groupSize} }}, document.getElementById('xslt-target'));">&#8250; </button> <!-- > -->
                   &#160;<button id="last-page" onclick="transform('test2019062901.xml', 'test2019062902.xsl', {{ currentPage: { $lastPage }, groupSize: {$groupSize} }}, document.getElementById('xslt-target'));">&#187; </button>  <!-- >> -->      
                  </span>     
                 </td>   
                 <td>page: <span id="page"><xsl:value-of select="$currentPage"/></span>/<xsl:value-of select="$lastPage"/> </td>
                </tr>                  
              </tfoot>
          </table>
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
