<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" href="input-valid.xml"/>
  <p:output port="result" pipe="report@validate"/>

  <p:validate-with-nvdl name="validate">
    <p:with-input port="nvdl" href="example.nvdl"/>
  </p:validate-with-nvdl>

</p:declare-step>
