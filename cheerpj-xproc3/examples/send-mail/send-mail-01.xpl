<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:input port="source">
    <p:inline>
      <emx:Message xmlns:emx="URN:ietf:params:email-xml:" xmlns:rfc822="URN:ietf:params:rfc822:">
        <rfc822:from>
          <emx:Address>
            <emx:adrs>mailto:someone@…</emx:adrs>
            <emx:name>John Doe</emx:name>
          </emx:Address>
        </rfc822:from>
        <rfc822:to>
          <emx:Address>
            <emx:adrs>mailto:erik@xatapult.nl</emx:adrs>
            <emx:name>Erik Siegel</emx:name>
          </emx:Address>
        </rfc822:to>
        <rfc822:subject>XProcRef is awesome</rfc822:subject>
        <emx:content type="text/plain" xml:space="preserve">
          Hi Erik,
          
          XProcRef is awesome! Congrats and kudos!
          
          Regards,
          John Doe
        </emx:content>
      </emx:Message>
    </p:inline>
  </p:input>

  <p:output port="result"/>

  <p:send-mail>
    <p:with-option name="auth" select="map{
      'username': '…', 
      'password': '…'
    }"/>
    <p:with-option name="parameters" select="map{
      'send-authorization': true(),
      'host': '…',
      'port': …   
    }"/>
  </p:send-mail>

</p:declare-step>
