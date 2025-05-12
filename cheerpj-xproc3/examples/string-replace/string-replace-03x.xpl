<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <things>
      <thing name="brick" description=""/>
      <thing name="screw"/>
      <thing name="mortar" description=""/>
      <thing name="door" description="A door"/>
    </things>
  </p:input>
  <p:output port="result"/>

  <p:add-attribute match="thing[empty(@description)]" attribute-name="description" attribute-value=""/>
  <p:string-replace match="thing/@description[. eq '']" replace="'Thing ' || count(../preceding-sibling::thing) + 1 || ': ' || ../@name"/>

</p:declare-step>
