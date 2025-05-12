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

  <p:replace match="thing">
    <p:with-input port="replacement">
      <another-thing/>
    </p:with-input>
  </p:replace>

</p:declare-step>
