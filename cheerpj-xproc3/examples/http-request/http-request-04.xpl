<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:map="http://www.w3.org/2005/xpath-functions/map" version="3.0">

  <p:output port="result" sequence="true"/>

  <p:http-request href="https://echo.free.beeceptor.com" name="request">
    <p:with-input port="source">
      <p:empty/>
    </p:with-input>
  </p:http-request>

  <p:variable name="response-headers" as="map(*)" select=".?headers" pipe="report@request"/>
  <p:for-each>
    <p:with-input select="map:keys($response-headers)"/>
    <p:identity>
      <p:with-input>
        <response-header name="{.}" value="{$response-headers(.)}"/>
      </p:with-input>
    </p:identity>
  </p:for-each>
  <p:wrap-sequence wrapper="http-response-headers"/>

</p:declare-step>
