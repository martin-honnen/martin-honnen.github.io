<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:c="http://www.w3.org/ns/xproc-step"
                xmlns:ex="http://exproc.org/ns/contrib"
                xmlns:p="http://www.w3.org/ns/xproc"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                type="ex:xslt-save"
                name="main"
                version="3.1">
   <p:input port="source"
            primary="true"
            sequence="true"
            content-types="any"/>
   <p:input port="stylesheet" content-types="xml"/>
   <p:output port="result"
             primary="true"
             sequence="true"
             content-types="any"
             pipe="result@xslt"/>
   <p:output port="secondary"
             sequence="true"
             content-types="any"
             pipe="secondary@xslt"/>
   <p:option name="show-stored-uris" as="xs:boolean" select="false()"/>
   <p:option name="ignore-failed-store" as="xs:boolean" select="false()"/>
   <p:option name="parameters" as="map(xs:QName,item()*)?"/>
   <p:option name="static-parameters" as="map(xs:QName,item()*)?"/>
   <p:option name="global-context-item" as="item()?"/>
   <p:option name="populate-default-collection" as="xs:boolean?" select="true()"/>
   <p:option name="initial-mode" as="xs:QName?"/>
   <p:option name="template-name" as="xs:QName?"/>
   <p:option name="output-base-uri" as="xs:anyURI?"/>
   <p:option name="version" as="xs:string?"/>
   <p:xslt name="xslt">
      <p:with-input port="source" pipe="source@main"/>
      <p:with-input port="stylesheet" pipe="stylesheet@main"/>
      <p:with-option name="parameters" select="$parameters"/>
      <p:with-option name="static-parameters" select="$static-parameters"/>
      <p:with-option name="global-context-item" select="$global-context-item"/>
      <p:with-option name="populate-default-collection"
                     select="$populate-default-collection"/>
      <p:with-option name="initial-mode" select="$initial-mode"/>
      <p:with-option name="template-name" select="$template-name"/>
      <p:with-option name="output-base-uri" select="$output-base-uri"/>
      <p:with-option name="version" select="$version"/>
   </p:xslt>
   <p:for-each>
      <p:with-input pipe="result@xslt secondary@xslt"/>
      <p:choose>
         <p:when test="$ignore-failed-store">
            <p:try>
               <p:store href="{base-uri(/)}"/>
               <p:message select="Stored {base-uri(/)}" test="{$show-stored-uris}"/>
               <p:catch>
                  <p:message select="{'Failed to store XSLT output: '                                 || p:document-property(., 'content-type')                                 || ' ' || base-uri(/)}"/>
               </p:catch>
            </p:try>
         </p:when>
         <p:otherwise>
            <p:store href="{base-uri(/)}"/>
            <p:message select="Stored {base-uri(/)}" test="{$show-stored-uris}"/>
         </p:otherwise>
      </p:choose>
   </p:for-each>
</p:declare-step>
