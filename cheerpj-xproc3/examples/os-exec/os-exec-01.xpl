<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref">

  <p:output port="result"/>

  <p:variable name="cwd" 
    select="static-base-uri() => replace('^file:/+', '') => replace('[^/\\]+$', '')"/>

  <p:os-exec command="cmd" cwd="{$cwd}">
    <p:with-option name="args" select="('/C', 'dir', 'data')"/>
    <p:with-input port="source">
      <p:empty/>
    </p:with-input>
  </p:os-exec>
  <p:text-replace pattern="C:\\.+" replacement="C:\\…\\data" xpref:example-remove="true"/>
</p:declare-step>
