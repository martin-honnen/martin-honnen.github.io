<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <p:document href="in1.xml"/>
    <p:document href="test/in2.xml"/>
  </p:input>
  <p:output port="result"/>

  <p:variable name="relative-to" select="resolve-uri('.', static-base-uri())"/>

  <p:archive relative-to="{$relative-to}"/>

  <p:store href="tmp/result.zip"/>
  <p:archive-manifest relative-to="{$relative-to}"/>

</p:declare-step>
