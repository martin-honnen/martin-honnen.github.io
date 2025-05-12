<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:output port="result" sequence="true"/>

  <p:http-request href="https://xprocref.org">
    <p:with-input port="source">
      <p:empty/>
    </p:with-input>
  </p:http-request>

  <p:delete match="/h:html/h:body" xmlns:h="http://www.w3.org/1999/xhtml"/>

</p:declare-step>
