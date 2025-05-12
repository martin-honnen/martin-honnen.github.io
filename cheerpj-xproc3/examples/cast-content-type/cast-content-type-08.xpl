<?xml version="1.0" encoding="UTF-8"?> 
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <c:data xmlns:c="http://www.w3.org/ns/xproc-step" content-type="x/x" encoding="base64">SGkgdGhlcmUh</c:data>
  </p:input>
  <p:output port="result"/>

  <p:cast-content-type content-type="x/x"/>

  <p:variable name="contents" select="string(.)"/>
  <p:identity message="*** {$contents}"/>

</p:declare-step>
