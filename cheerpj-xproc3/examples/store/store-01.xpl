<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">
  <p:option static="true" name="write-debug-documents" select="true()"/> … <p:store use-when="{$write-debug-documents}"
    href="file:///my/debug/files/location/stepx.xml"/> … </p:declare-step>
