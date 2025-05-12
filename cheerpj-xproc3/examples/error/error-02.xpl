<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:my="#my-application" version="3.0">

  <p:input port="source">
    <result status="bad"/>
  </p:input>
  <p:output port="result"/>

  <p:if test="/*/@status ne 'good'">
    <p:try>

      <p:error code="my:error">
        <p:with-input>
          <p:inline content-type="text/plain">The status is not good but {/*/@status}</p:inline>
        </p:with-input>
      </p:error>

      <p:catch name="error-catch">
        <p:identity>
          <p:with-input pipe="error@error-catch"/>
        </p:identity>
      </p:catch>

    </p:try>
  </p:if>

</p:declare-step>
