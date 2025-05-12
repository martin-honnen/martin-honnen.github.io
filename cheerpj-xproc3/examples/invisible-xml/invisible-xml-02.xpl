<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref">

  <p:input port="source" href="grammar.txt"/>
  <p:output port="result"/>

  <p:invisible-xml>
    <p:with-input port="grammar">
      <p:empty/>
    </p:with-input>
  </p:invisible-xml>
  <p:group xpref:example-remove="true">
    <p:xslt>
      <p:with-input port="stylesheet" href="xsl/shorten.xsl"/>
    </p:xslt>
  </p:group>
</p:declare-step>
