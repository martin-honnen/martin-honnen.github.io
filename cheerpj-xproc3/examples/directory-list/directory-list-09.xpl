<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:c="http://www.w3.org/ns/xproc-step" version="3.0">

  <p:output port="result"/>

  <p:directory-list path="data" include-filter="\.xml$" max-depth="unbounded"/>
  <p:make-absolute-uris match="@name"/>

  <p:for-each>
    <p:with-input select="//c:file"/>
    <p:load href="{/*/@name}"/>
  </p:for-each>
  <p:wrap-sequence wrapper="all-xml-documents"/>

</p:declare-step>
