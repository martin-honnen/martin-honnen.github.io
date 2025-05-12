<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <p:document href="to-join-1.txt"/>
    <p:document href="to-join-2.txt"/>
    <p:document href="to-join-3.txt"/>
  </p:input>
  <p:output port="result"/>

  <p:text-join/>

</p:declare-step>
