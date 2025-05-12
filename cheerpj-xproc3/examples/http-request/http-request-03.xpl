<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:map="http://www.w3.org/2005/xpath-functions/map" version="3.0">

  <p:output port="result" sequence="true"/>

  <p:http-request href="https://echo.free.beeceptor.com" headers="map{'xyz': '123' }">
    <p:with-input port="source">
      <p:empty/>
    </p:with-input>
  </p:http-request>

  <p:variable name="headers" as="map(*)" select=".?headers"/>
  <p:for-each>
    <p:with-input select="map:keys($headers)"/>
    <p:identity>
      <p:with-input>
        <request-header name="{.}" value="{$headers(.)}"/>
      </p:with-input>
    </p:identity>
  </p:for-each>
  <p:wrap-sequence wrapper="http-request-headers"/>

</p:declare-step>
