<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <hash-values crc="" md="" sha=""/>
  </p:input>
  <p:output port="result"/>

  <p:hash algorithm="crc" value="Hi there!" match="/*/@crc"/>
  <p:hash algorithm="md" value="Hi there!" match="/*/@md"/>
  <p:hash algorithm="sha" value="Hi there!" match="/*/@sha"/>

</p:declare-step>
