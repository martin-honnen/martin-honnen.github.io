<?xml version="1.0" encoding="UTF-8"?> 
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <input-document timestamp="2024-08-23T09:12:45">
      <text color="red">Hi there!</text>
    </input-document>
  </p:input>
  <p:output port="result"/>

  <p:cast-content-type content-type="text/plain"/>

</p:declare-step>
