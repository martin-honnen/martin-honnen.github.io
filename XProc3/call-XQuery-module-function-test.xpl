<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0"
    xmlns:functx="http://www.functx.com"
    xmlns:mf="http://example.com/mf">
    <p:import href="libraries/call-function-in-XQuery-module.xpl"/>
    <p:output port="result" sequence="true" serialization="map { 'method' : 'json' }"/>
    <mf:call-xquery-function 
      xquery-lib-module-ns="http://www.functx.com"
      xquery-lib-module-uri="http://www.xqueryfunctions.com/xq/functx-1.0.1-doc.xq"
      function-name="functx:pad-string-to-length" function-arity="3" function-arguments="(['abc', '*', 10]"/>
</p:declare-step>
