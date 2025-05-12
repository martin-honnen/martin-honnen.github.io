<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc" version="3.0">

  <p:output port="result"/>

  <p:www-form-urlencode parameters="map{ 'a': ('b', 'b2'), 'c': 'd e f' }"/>

</p:declare-step>
