<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref"
  xmlns:mox="http://www.xml-project.com/morganaxproc" xmlns:c="http://www.w3.org/ns/xproc-step">

  <p:output port="result"/>

  <p:os-info/>
  <p:group xpref:example-remove="true">
    <!-- Change it to keep my privacy. -->
    <p:delete match="@mox:*"/>
    <p:string-replace match="/*/@cwd" replace="'C:\…'"/>
    <p:delete match="/*/c:environment"/>
    <p:insert match="/*" position="first-child">
      <p:with-input port="insertion">
        <c:environment name="…" value="…"/>
      </p:with-input>
    </p:insert>
    <p:namespace-delete prefixes="mox"/>
    <p:namespace-delete prefixes="xpref"/>
  </p:group>
</p:declare-step>
