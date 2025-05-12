<?xml version="1.0" encoding="UTF-8"?> 
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" xmlns:c="http://www.w3.org/ns/xproc-step" version="3.0">

  <p:input port="source">
    <map xmlns="http://www.w3.org/2005/xpath-functions">
      <string key="desc">Distances </string>
      <boolean key="uptodate">true</boolean>
      <null key="author"/>
      <map key="cities">
        <array key="Brussels">
          <map>
            <string key="to">London</string>
            <number key="distance">322</number>
          </map>
        </array>
      </map>
    </map>
  </p:input>
  <p:output port="result"/>

  <p:cast-content-type content-type="application/json"/>

</p:declare-step>
