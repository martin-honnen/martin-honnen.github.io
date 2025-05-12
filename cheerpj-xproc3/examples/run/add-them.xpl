<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="3.0" exclude-inline-prefixes="#all">

  <p:input port="source"/>
  <p:output port="result"/>

  <p:variable name="a" as="xs:integer" select="xs:integer(/*/@a)"/>
  <p:variable name="b" as="xs:integer" select="xs:integer(/*/@b)"/>
  
  <p:identity>
    <p:with-input>
      <p>Adding {$a} to {$b} results in {$a + $b}!</p>
    </p:with-input>
  </p:identity>

</p:declare-step>
