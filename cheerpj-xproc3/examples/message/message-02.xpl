<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="3.0">

  <p:input port="source"/>
  <p:output port="result"/>
  
  <p:option static="true" name="debug-messages-on" as="xs:boolean" select="true()"/>
  
  <!-- Some preliminary stuff… -->

  <p:identity use-when="$debug-messages-on" message="Starting computation at {current-dateTime()}"/>
  
  <!-- Steps that implement the computation… -->

</p:declare-step>
