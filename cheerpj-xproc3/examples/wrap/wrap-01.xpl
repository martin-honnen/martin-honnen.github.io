<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <things>
      <thing name="laptop"/>
      <thing name="desktop">
        <subthings>
          <thing name="keyboard"/>
          <thing name="mouse"/>
        </subthings>
      </thing>
    </things>
  </p:input>
  <p:output port="result" sequence="true"/>

  <p:wrap match="thing" wrapper="computer-part"/>

</p:declare-step>
