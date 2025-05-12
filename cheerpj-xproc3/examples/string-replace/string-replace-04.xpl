<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <things>
      <thing name="brick" description=""/>
      <thing name="mortar" description=""/>
    </things>
  </p:input>
  <p:output port="result"/>

  <p:string-replace match="thing/@description">
    <p:with-option name="replace" select="'''Thing '' || count(../preceding-sibling::thing) + 1 || '': '' || ../@name'"/>
  </p:string-replace>

</p:declare-step>
