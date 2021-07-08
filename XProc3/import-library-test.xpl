<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0"
    xmlns:mhgf="http://example.com/mhgf">
    <p:import href="libraries/grouping.xpl"/>
    <p:input port="source"/>
    <p:output port="result" sequence="true" serialization="map { 'method' : 'json' }"/>
    <mhgf:split-into-sequence-of-array-of-items/>
    <!-- <p:identity message=". instance of array(node()): {. instance of array(node())}"/> -->
</p:declare-step>