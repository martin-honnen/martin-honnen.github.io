<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <some-xml/>
  </p:input>
  <p:output port="result"/>

  <p:store href="tmp/x.xml"/>

  <p:identity>
    <p:with-input pipe="result-uri"/>
  </p:identity>

</p:declare-step>
