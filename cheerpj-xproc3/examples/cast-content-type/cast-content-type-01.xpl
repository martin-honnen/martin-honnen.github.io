<?xml version="1.0" encoding="UTF-8"?> 
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:c="http://www.w3.org/ns/xproc-step" version="3.0">

  <p:input port="source">
    <c:param-set>
      <c:param name="param1" value="y"/>
      <c:param name="param2" value="1234"/>
    </c:param-set>
  </p:input>
  <p:output port="result"/>

  <p:cast-content-type content-type="application/json"/>

</p:declare-step>
