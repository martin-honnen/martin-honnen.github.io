<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref" xmlns:err="http://www.w3.org/ns/xproc-error"
  version="3.0">

  <p:input port="source" href="input-invalid.xml"/>
  <p:output port="result"/>

  <p:try>
    <p:validate-with-xml-schema>
      <p:with-input port="schema" href="example.xsd"/>
    </p:validate-with-xml-schema>
    <p:catch code="err:XC0156">
      <p:identity/>
    </p:catch>
  </p:try>
  <p:group xpref:example-remove="true">
    <!-- Remove reference to the example pipeline name: -->
    <p:string-replace match="@href[contains(., 'validate-with-xml-schema-')]" replace="'file:/…'"/>
  </p:group>
</p:declare-step>
