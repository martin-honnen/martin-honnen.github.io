<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <some-document>
      <contents a="b"/>
    </some-document>
  </p:input>
  <p:output port="result"/>

  <p:namespace-rename to="#some-namespace" apply-to="elements"/>

</p:declare-step>
