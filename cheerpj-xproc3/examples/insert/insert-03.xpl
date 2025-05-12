<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <things>
      <thing id="123">USB adapter</thing>
      <thing id="456">Joystick</thing>
      <thing id="789">Mouse</thing>
    </things>
  </p:input>
  <p:output port="result"/>

  <p:insert match="/things/thing[@id eq '456']" position="before">
    <p:with-input port="insertion">
      <thing id="999">Keyboard</thing>
    </p:with-input>
  </p:insert>

</p:declare-step>
