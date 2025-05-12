<?xml version="1.0" encoding="UTF-8"?> 
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <p:inline content-type="application/json" expand-text="false" xml:space="preserve">{"desc":"Distances","uptodate":true,"author":null,"cities":{"Brussels":[{"to":"London","distance":322}]}}</p:inline>
  </p:input>
  <p:output port="result"/>

  <p:cast-content-type content-type="text/xml"/>

</p:declare-step>
