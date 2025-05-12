<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="input-02.xml"/>
  <p:output port="result"/>

  <p:encode serialization="map{'indent': true()}"/>

</p:declare-step>
