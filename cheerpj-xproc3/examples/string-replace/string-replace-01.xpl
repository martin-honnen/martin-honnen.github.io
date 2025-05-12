<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <thing>
      <contents/>
    </thing>
  </p:input>
  <p:output port="result"/>

  <p:string-replace match="thing/contents" replace="'This is a thing of beauty!'"/>

</p:declare-step>
