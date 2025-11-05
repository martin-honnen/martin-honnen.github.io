<p:declare-step xmlns:p="http://www.w3.org/ns/xproc"
                exclude-inline-prefixes="#all"
                version="3.0">
    <p:output port="result"/>

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