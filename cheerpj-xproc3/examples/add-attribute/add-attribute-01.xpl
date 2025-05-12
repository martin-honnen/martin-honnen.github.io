<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <texts>
      <text>Hello there!</text>
      <text>This is funny…</text>
      <text type="normal">And that's normal.</text>
    </texts>
  </p:input>
  <p:output port="result"/>

  <p:add-attribute match="text" attribute-name="type" attribute-value="special"/>

</p:declare-step>
