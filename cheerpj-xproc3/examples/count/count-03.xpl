<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <p:document href="in1.xml"/>
    <p:document href="in1.xml"/>
    <p:document href="in1.xml"/>
  </p:input>
  <p:output port="result"/>

  <p:variable name="count" select="count(collection())" collection="true"/>

  <p:identity>
    <p:with-input>
      <document-count>{$count}</document-count>
    </p:with-input>
  </p:identity>

</p:declare-step>
