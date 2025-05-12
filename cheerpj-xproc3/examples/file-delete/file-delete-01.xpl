<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref"
  xmlns:mox="http://www.xml-project.com/morganaxproc">

  <p:output port="result"/>
  <p:group xpref:example-remove="true">
    <!-- Some preparations to make sure this operation is repeatable. Removing this means an empty line, so as it is spaced here 
         it will come out fine in the example. -->
    <p:file-copy href="data/x-source.xml" target="data/x.xml" fail-on-error="false"/>
  </p:group>
  <p:file-delete href="data/x.xml"/>
  <p:group xpref:example-remove="true">
    <p:delete match="@mox:*"/>
    <p:namespace-delete prefixes="mox"/>
  </p:group>
</p:declare-step>
