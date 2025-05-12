<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <p:inline content-type="application/json" expand-text="false">{"dupkey": "a", "debug": true}</p:inline>
    <p:inline content-type="application/json" expand-text="false">{"dupkey": "b"}</p:inline>
  </p:input>
  <p:output port="result"/>

  <p:json-merge duplicates="use-last"/>

</p:declare-step>
