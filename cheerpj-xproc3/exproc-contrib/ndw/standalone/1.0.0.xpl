<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:ex="http://exproc.org/ns/contrib"
                xmlns:h="http://www.w3.org/1999/xhtml"
                xmlns:p="http://www.w3.org/ns/xproc"
                type="ex:standalone"
                name="main"
                version="3.1">
   <p:input port="source" content-types="xml html"/>
   <p:output port="result" content-types="xml html"/>
   <p:viewport name="vphref" match="h:link[@href and @rel='stylesheet']">
      <p:load href="{resolve-uri(h:link/@href, base-uri(.))}"/>
      <p:encode name="encoded"/>
      <p:set-attributes>
         <p:with-input pipe="@vphref"/>
         <p:with-option name="attributes" select="map{'href': 'data:text/css;base64,' || .}">
            <p:pipe step="encoded"/>
         </p:with-option>
      </p:set-attributes>
   </p:viewport>
   <p:viewport name="vpsrc" match="h:img[@src] | h:script[@src]">
      <p:load href="{resolve-uri(*/@src, base-uri(.))}"/>
      <p:variable name="ctype" select="p:document-property(., 'content-type')"/>
      <p:encode name="encoded"/>
      <p:set-attributes>
         <p:with-input pipe="@vpsrc"/>
         <p:with-option name="attributes"
                        select="map{'src': 'data:' || $ctype || ';base64,' || .}">
            <p:pipe step="encoded"/>
         </p:with-option>
      </p:set-attributes>
   </p:viewport>
</p:declare-step>
