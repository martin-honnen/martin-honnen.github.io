<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="3.0" exclude-inline-prefixes="#all">

  <p:input port="source">
    <parts units="mm">
      <screw diameter="4"/>
      <bolt length="35"/>
      <pipe diameter="4"/>
    </parts>
  </p:input>
  <p:output port="result" sequence="true"/>

  <p:option name="required-diameter" as="xs:integer" select="4"/>

  <p:filter select="/parts/*[xs:integer(@diameter) eq {$required-diameter}]"/>

</p:declare-step>
