<p:library xmlns:p="http://www.w3.org/ns/xproc" version="3.0"
 xmlns:c="http://www.w3.org/ns/xproc-step"
 xmlns:mf="http://example.com/mf"
 xmlns:xs="http://www.w3.org/2001/XMLSchema">
 
 <p:declare-step type="mf:call-xquery-function">
   
   <p:option name="xquery-lib-module-uri" as="xs:anyURI" required="true"/>
   <p:option name="xquery-lib-module-ns" as="xs:anyURI" required="true"/>
  
   <p:option name="function-name" as="xs:QName" required="true"/>
   <p:option name="function-arity" as="xs:integer" required="true"/>
   <p:option name="function-arguments" as="array(*)" select="[]"/>
   
   <p:output port="result" sequence="true"/>
   
   <p:xquery version="3.1" parameters="map { 'function-name' : $function-name, 'function-arity' : $function-arity, 'function-arguments' : $function-arguments }">
     <p:with-input port="query">
       <c:query>
       import module '{$xquery-lib-module-ns}' at '{$xquery-lib-module-uri}';
         
       declare variable $function-name as xs:QName external;
       declare variable $function-arity as xs:integer external;
       declare variable $function-arguments as array(*) external := [];
         
       function-lookup($function-name, $function-arity) => apply($function-arguments)
       </c:query>
     </p:with-input>
     <p:with-input port="source">
        <p:empty/>
      </p:with-input>
   </p:xquery>

  </p:declare-step>

</p:library>
