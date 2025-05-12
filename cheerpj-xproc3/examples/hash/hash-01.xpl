<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <hash-value>
      <hash>Will be replaced by the hash value!</hash>
    </hash-value>
  </p:input>
  <p:output port="result"/>

  <p:hash algorithm="crc" value="Hi there!"/>

</p:declare-step>
