<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:con="#myconfig" version="3.0">

  <p:input port="source">
    <config xmlns:con="#myconfig" con:status="special">
      <con:thing>button</con:thing>
    </config>
  </p:input>
  <p:output port="result"/>

  <p:namespace-delete prefixes="con"/>

</p:declare-step>
