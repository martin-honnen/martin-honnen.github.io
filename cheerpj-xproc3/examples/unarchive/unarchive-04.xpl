<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="test.zip"/>
  <p:output port="result"/>

  <p:unarchive relative-to="file:///my/documents/"/>

  <p:for-each>
    <p:identity>
      <p:with-input exclude-inline-prefixes="#all">
        <unarchived-file href="{p:document-property(/, 'base-uri')}" content-type="{p:document-property(/, 'content-type')}"/>
      </p:with-input>
    </p:identity>
  </p:for-each>
  <p:wrap-sequence wrapper="unarchived-files"/>

</p:declare-step>
