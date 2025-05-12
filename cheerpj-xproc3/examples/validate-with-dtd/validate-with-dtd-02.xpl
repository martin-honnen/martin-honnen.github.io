<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="input-invalid.xml"/>
  <p:output port="result" pipe="report@validate"/>

  <p:validate-with-dtd assert-valid="false" serialization="map{'doctype-system' : 'example.dtd'}" name="validate"/>

</p:declare-step>
