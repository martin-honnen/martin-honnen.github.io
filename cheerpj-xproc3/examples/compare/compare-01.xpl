<?xml version="1.0" encoding="UTF-8"?> 
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <p:inline>
      <texts>
        <text>Hi there!</text>
      </texts>
    </p:inline>
  </p:input>
  <p:output port="result" pipe="result@comparing"/>

  <p:compare name="comparing">
    <p:with-input port="alternate">
      <texts>
        <text>Hi there!</text>
      </texts>
    </p:with-input>
  </p:compare>

</p:declare-step>
