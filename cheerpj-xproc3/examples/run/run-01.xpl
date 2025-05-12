<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="input.xml"/>
  <p:output port="result"/>

  <p:viewport match="generate">
    <p:run>
      <p:with-input href="{/*/@href-pipeline}"/>
      <p:run-input port="source"/>
      <p:output port="result"/>
    </p:run>
  </p:viewport>

</p:declare-step>
