<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="input-valid.xml"/>
  <p:output port="result"/>

  <p:validate-with-xml-schema>
    <p:with-input port="schema" href="example.xsd"/>
  </p:validate-with-xml-schema>

</p:declare-step>
