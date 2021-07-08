<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">
    <p:input port="source"/>
    <p:output port="result"/>
    <!-- <p:import-functions href="../xslt/generic-positional-functions.xsl" type="application/xslt+xml" namespace="http://example.com/mf"/> -->
    <p:identity
        message="{p:function-library-importable('application/xslt+xml')}"/>
</p:declare-step>