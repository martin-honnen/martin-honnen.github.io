<p:library xmlns:p="http://www.w3.org/ns/xproc" version="3.0" 
 xmlns:mf="http://example.com/mhgf"
 xmlns:xs="http://www.w3.org/2001/XMLSchema">
 
 <p:option name="xslt-lib-uri" select="'../../xslt/generic-positional-grouping-functions.xsl'"/>
 
 <p:declare-step type="mf:call-function">
   
   <p:option name="function-name" as="xs:QName" required="true"/>
   <p:option name="function-arity" as="xs:integer" required="true"/>
   <p:option name="function-arguments" as="array(*)" select="[]"/>
   
   <p:input port="source"/>
   <p:output port="result" sequence="true"/>

   <p:xslt version="3.0" template-name="xsl:initial-template" parameters="map { 'function-name' : $function-name, 'function-arity' : $function-arity, 'function-arguments' : $function-arguments }" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
     <p:with-input port="stylesheet">
       <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0"
         xmlns:xs="http://www.w3.org/2001/XMLSchema"
         xmlns:mf="http://example.com/mf"
         exclude-result-prefixes="#all">

         <xsl:import href="{$xslt-lib-uri}"/>
         
         <xsl:param name="function-name" as="xs:QName" required="yes"/>
         <xsl:param name="function-arity" as="xs:integer" required="yes"/>
         <xsl:param name="function-arguments" as="array(*)" select="[]"/>

         <xsl:output build-tree="no"/>

         <xsl:template name="xsl:initial-template">
           <xsl:sequence select="function-lookup($function-name, $function-arity) => apply($function-arguments)"/>
         </xsl:template>

       </xsl:stylesheet>
     </p:with-input>
   </p:xslt>

  </p:declare-step>

</p:library>
