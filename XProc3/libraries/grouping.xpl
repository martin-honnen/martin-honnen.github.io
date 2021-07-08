<p:library xmlns:p="http://www.w3.org/ns/xproc" version="3.0" 
 xmlns:mhgf="http://example.com/mhgf">
 
 <p:option name="xslt-lib-uri" select="'../../xslt/generic-positional-grouping-functions.xsl'" static="true"/>
 
 <p:declare-step type="mhgf:split-into-sequence-of-array-of-items">
   <p:input port="source"/>
   <p:output port="result" sequence="true"/>

   <p:xslt version="3.0" template-name="xsl:initial-template" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
     <p:with-input port="stylesheet">
       <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0"
         xmlns:xs="http://www.w3.org/2001/XMLSchema"
         xmlns:mf="http://example.com/mf"
         exclude-result-prefixes="#all">

         <xsl:import href="{$xslt-lib-uri}"/>

         <xsl:output build-tree="no"/>

         <xsl:template name="xsl:initial-template">
           <xsl:sequence select="mf:group-into-sequence-of-arrays(root/item, 3)"/>
         </xsl:template>

       </xsl:stylesheet>
     </p:with-input>
   </p:xslt>

   <!-- <p:identity message=". instance of array(node()): {. instance of array(node())}"/> -->

  </p:declare-step>

</p:library>