<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <things>
      <thing name="screw" id="A123" thing-name="something else"/>
    </things>
  </p:input>
  <p:output port="result"/>

  <p:rename match="@name" new-name="thing-name"/>

</p:declare-step>
