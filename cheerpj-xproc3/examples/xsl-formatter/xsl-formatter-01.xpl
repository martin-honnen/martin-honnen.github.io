<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source"/>
  <p:output port="result" pipe="result-uri@store-pdf"/>

  <p:xsl-formatter/>
  <p:store href="result.pdf" name="store-pdf"/>

</p:declare-step>
