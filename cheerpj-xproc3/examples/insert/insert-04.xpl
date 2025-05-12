<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <things>
      <thing id="123">
        <name>USB adapter</name>
      </thing>
      <thing id="456">
        <name>Joystick</name>
      </thing>
      <thing id="789">
        <name>Mouse</name>
      </thing>
    </things>
  </p:input>
  <p:output port="result"/>

  <p:insert match="thing" position="last-child">
    <p:with-input port="insertion">
      <description>TBD</description>
    </p:with-input>
  </p:insert>

</p:declare-step>
