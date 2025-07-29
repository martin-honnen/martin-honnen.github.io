<p:declare-step xmlns:p="http://www.w3.org/ns/xproc"
                exclude-inline-prefixes="#all"
                version="3.0">
  <p:output port="result"/>

  <!-- This example runs three identity steps in order to print a message
       of several lines on the console. The message includes some
       Unicode characters. This will give you a sense of whether or
       not your console is configured correctly. If the default
       encoding is not Unicode; you'll see "?", or something like it.
       If the default encoding is Unicode, but your console is not
       *actually* using Unicode, you'll get some jumble of characters;
       exactly which ones depends on the details of the mismatch.
       See http://docs.xmlcalabash.com/userguide/current/installation.html#console-encoding
  -->
  
  <p:identity message="This message is printed when the identity step runs.">
    <p:with-input>
      <helloWorld>This is {p:system-property('p:product-name')
      } version {p:system-property('p:product-version')}.
Share and enjoy!</helloWorld>
    </p:with-input>
  </p:identity>

  <p:identity message="It contains “😻” (U+201C, U+1F63B, U+201D) to test"/>

  <p:identity message="the console encoding's ability to display Unicode."/>

</p:declare-step>
