<?xml version="1.0" encoding="UTF-8"?> 
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <p:inline content-type="x/x">Hi there!</p:inline>
  </p:input>
  <p:output port="result"/>

  <p:cast-content-type content-type="text/xml"/>

</p:declare-step>
