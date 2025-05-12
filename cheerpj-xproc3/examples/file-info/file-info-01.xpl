<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref"
  xmlns:mox="http://www.xml-project.com/morganaxproc">

  <p:output port="result"/>

  <p:file-info href="data/x.xml"/>
  <p:group xpref:example-remove="true">
    <p:delete match="@mox:*"/>
    <p:namespace-delete prefixes="mox"/>
  </p:group>
</p:declare-step>
