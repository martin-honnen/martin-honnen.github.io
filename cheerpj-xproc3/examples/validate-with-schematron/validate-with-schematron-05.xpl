<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref" xmlns:err="http://www.w3.org/ns/xproc-error"
  version="3.0">

  <p:input port="source" href="input-invalid.xml"/>
  <p:output port="result"/>

  <p:try>
    <p:validate-with-schematron assert-valid="true">
      <p:with-input port="schema" href="example.sch"/>
    </p:validate-with-schematron>
    <p:catch code="err:XC0054">
      <p:identity/>
    </p:catch>
  </p:try>
  <p:group xpref:example-remove="true">
    <!-- Remove reference to the example pipeline name: -->
    <p:string-replace match="@href[contains(., 'validate-with-schematron-')]" replace="'file:/…'"/>
  </p:group>
</p:declare-step>
