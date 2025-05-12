<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <things>
      <thing name="screw" id="A123"/>
      <thing name="bolt" id="A789"/>
      <?convert debug="true"?>
    </things>
  </p:input>
  <p:output port="result"/>

  <p:rename match="/*/thing" new-name="Thing"/>
  <p:rename match="@name" new-name="thing-name"/>
  <p:rename match="processing-instruction(convert)" new-name="debug-processing"/>

</p:declare-step>
