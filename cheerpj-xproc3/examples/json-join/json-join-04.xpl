<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <p:inline content-type="application/json">"Hello!"</p:inline>
    <p:inline content-type="application/json">["a", "b", ["c", "d"] ]</p:inline>
  </p:input>
  <p:output port="result"/>

  <p:json-join flatten-to-depth="2"/>

</p:declare-step>
