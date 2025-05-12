<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">

    <things>
      <!-- Input document 1 -->
      <thing id="123"/>
      <nested-things>
        <thing id="456"/>
      </nested-things>
    </things>

    <things>
      <!-- Input document 2 -->
      <thing id="789"/>
    </things>

  </p:input>
  <p:output port="result" sequence="true"/>

  <p:xquery>
    <p:with-input port="query" href="sort-things.xql"/>
  </p:xquery>

</p:declare-step>
