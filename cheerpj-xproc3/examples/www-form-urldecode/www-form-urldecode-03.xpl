<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:output port="result"/>

  <p:www-form-urldecode value="a=b&amp;b=a%20b&amp;a=d+e+f"/>
  <p:identity>
    <p:with-input>
      <result-a-sequence>{string-join(.?a, '|')}</result-a-sequence>
    </p:with-input>
  </p:identity>

</p:declare-step>
