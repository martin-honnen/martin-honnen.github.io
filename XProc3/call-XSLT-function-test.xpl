<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0"
    xmlns:mf="http://example.com/mf">
    <p:import href="libraries/call-function-in-XSLT-lib.xpl"/>
    <p:input port="source"/>
    <p:output port="result" sequence="true" serialization="map { 'method' : 'json' }"/>
    <mf:call-function xslt-lib-uri="resolve-uri('../xslt/generic-positional-grouping-functions.xsl')" function-name="mf:group-into-sequence-of-arrays" function-arity="2" function-arguments="[/root/item, 3]"/>
</p:declare-step>
