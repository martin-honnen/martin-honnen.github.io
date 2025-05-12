<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <some-document xmlns="#some-namespace">
      <contents a="b"/>
    </some-document>
  </p:input>
  <p:output port="result"/>

  <p:namespace-rename from="#some-namespace" to="#some-other-namespace"/>

</p:declare-step>
