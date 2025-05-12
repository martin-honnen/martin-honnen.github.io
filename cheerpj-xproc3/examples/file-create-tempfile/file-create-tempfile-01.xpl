<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0" xmlns:xpref="http://www.xtpxlib.nl/ns/xprocref"
  xmlns:mox="http://www.xml-project.com/morganaxproc">

  <p:output port="result"/>
  <p:group xpref:example-remove="true">
    <!-- Some preparations to make sure this operation is repeatable. Removing this means an empty line, so as it is spaced here 
         it will come out fine in the example. -->
    <p:file-mkdir href="build/" fail-on-error="false"/>
  </p:group>
  <p:file-create-tempfile href="build/" delete-on-exit="true"/>

</p:declare-step>
