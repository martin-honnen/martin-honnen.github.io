<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <examples>
      <!--Comment 1-->
      <!--Another comment…-->
    </examples>
  </p:input>
  <p:output port="result" sequence="true"/>

  <p:wrap match="comment()" wrapper="comment"/>
  <p:string-replace match="comment/comment()" replace="string(.)"/>

</p:declare-step>
