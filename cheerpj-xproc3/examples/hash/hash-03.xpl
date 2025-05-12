<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <anything/>
  </p:input>
  <p:output port="result"/>

  <p:hash algorithm="crc" value="Hi there!" match="/"/>

</p:declare-step>
