<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <fruit name="banana" color="yellow"/>
    <fruit name="orange" color="orange"/>
    <fruit name="lemon" color="yellow"/>
    <fruit name="cauliflower" color="white"/>
  </p:input>
  <p:output port="result"/>

  <p:split-sequence test="position() eq last()"/>

  <p:wrap-sequence wrapper="matched-documents"/>

</p:declare-step>
