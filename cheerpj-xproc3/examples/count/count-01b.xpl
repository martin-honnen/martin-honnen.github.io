<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source" sequence="true">
    <p:document href="in1.xml"/>
    <p:document href="in1.xml"/>
    <p:document href="in1.xml"/>
  </p:input>
  <p:output port="result"/>

  <p:count/>

  <p:choose>
    <p:when test="number(.) eq 3">
      <p:identity>
        <p:with-input>
          <count-is-exactly-3/>
        </p:with-input>
      </p:identity>
    </p:when>
    <p:otherwise>
      <p:identity>
        <p:with-input>
          <count-is-not-3/>
        </p:with-input>
      </p:identity>
    </p:otherwise>
  </p:choose>


</p:declare-step>
