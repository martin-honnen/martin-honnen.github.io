<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <fruit name="banana" color="yellow"/>
    <fruit name="orange" color="orange"/>
    <fruit name="carrot" color="orange"/>
    <fruit name="lemon" color="yellow"/>
  </p:input>
  <p:output port="result" sequence="true"/>

  <p:wrap-sequence wrapper="fruits-by-color" group-adjacent="/*/@color"/>
  <p:wrap-sequence wrapper="groups"/>

</p:declare-step>
