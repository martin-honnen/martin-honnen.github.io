<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="input-invalid.xml"/>
  <p:output port="result" pipe="report@validate"/>

  <p:validate-with-schematron name="validate" assert-valid="false" report-format="xvrl">
    <p:with-input port="schema" href="example.sch"/>
  </p:validate-with-schematron>

</p:declare-step>
