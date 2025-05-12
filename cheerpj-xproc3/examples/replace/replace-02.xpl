<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <things>
      <thing>
        <contents/>
      </thing>
      <thing/>
    </things>
  </p:input>
  <p:output port="result"/>

  <p:viewport match="thing">
    <p:identity>
      <p:with-input>
        <another-thing/>
      </p:with-input>
    </p:identity>
  </p:viewport>

</p:declare-step>
