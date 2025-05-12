<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="input-valid.json"/>
  <p:output port="result" pipe="report@validate"/>

  <p:validate-with-json-schema name="validate">
    <p:with-input port="schema" href="example-json-schema.json"/>
  </p:validate-with-json-schema>

</p:declare-step>
