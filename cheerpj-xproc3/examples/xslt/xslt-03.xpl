<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <documents>
      <document name="x1.xml">
        <document-1/>
      </document>
      <document name="x2.xml">
        <document-2/>
      </document>
    </documents>
  </p:input>
  <p:output port="result" pipe="result@create-secondary-documents"/>

  <p:xslt name="create-secondary-documents">
    <p:with-input port="stylesheet" href="split-documents.xsl"/>
  </p:xslt>

  <p:for-each>
    <p:with-input pipe="secondary"/>
    <p:store href="{base-uri(/)}"/>
  </p:for-each>

</p:declare-step>
