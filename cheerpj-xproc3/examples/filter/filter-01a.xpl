<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <parts units="mm">
      <screw diameter="4"/>
      <bolt length="35"/>
      <pipe diameter="4"/>
    </parts>
  </p:input>
  <p:output port="result" sequence="true"/>

  <p:identity>
    <p:with-input select="/parts/(bolt | pipe)"/>
  </p:identity>

</p:declare-step>
