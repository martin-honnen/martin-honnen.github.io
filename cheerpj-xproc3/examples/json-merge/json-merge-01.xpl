<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <p:inline>
      <some-xml a="b"/>
    </p:inline>
    <p:inline content-type="application/json" expand-text="false">{"key": 12345, "debug": true}</p:inline>
    <p:inline content-type="text/plain">Hello there!</p:inline>
  </p:input>
  <p:output port="result"/>

  <p:json-merge/>

</p:declare-step>
