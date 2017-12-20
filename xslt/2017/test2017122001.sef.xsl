<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://ns.saxonica.com/xslt/export" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:vv="http://saxon.sf.net/generated-variable" xmlns:java-type="http://saxon.sf.net/java-type" version="30" packageVersion="1" saxonVersion="9.8.0.7" target="JS" targetVersion="1" relocatable="false">
 <co id="0" binds="">
  <mode name="Q{http://saxonica.com/ns/interactiveXSLT}onclick" onNo="TC" flags="W" patternSlots="0">
   <templateRule prec="0" prio="0.5" seq="0" rank="0" minImp="0" slots="1" flags="s" line="15" module="file:/C:/Users/Martin%20Honnen/Documents/GitHub/martin-honnen.github.io/xslt/2017/./test2017122001.xsl">
    <p.withPredicate role="match">
     <p.nodeTest test="element(Q{}div)" jsTest="var q=SaxonJS.U.nameOfNode(item); return SaxonJS.U.isNode(item) &amp;&amp; item.nodeType===1 &amp;&amp; q.uri===''&amp;&amp;q.local==='div';"/>
     <fn baseUri="file:/C:/Users/Martin%20Honnen/Documents/GitHub/martin-honnen.github.io/xslt/2017/./test2017122001.xsl" ns="xsl=~ ixsl=~ xs=~" line="15" name="contains">
      <cvUntyped to="xs:string">
       <attVal name="Q{}class" chk="0"/>
      </cvUntyped>
      <str val="responsive"/>
     </fn>
    </p.withPredicate>
    <let role="action" baseUri="file:/C:/Users/Martin%20Honnen/Documents/GitHub/martin-honnen.github.io/xslt/2017/./test2017122001.xsl" ns="xsl=~ ixsl=~ xs=~" line="16" var="vv:v0" as="xs:boolean" slot="0" eval="13">
     <vc op="lt" comp="CalVC">
      <fn name="current-date"/>
      <atomic val="2000-01-01" type="xs:date"/>
     </vc>
     <filter flags="ib">
      <ifCall name="Q{http://saxonica.com/ns/interactiveXSLT}call" type="item()?">
       <check card="1" diag="0|0||ixsl:call">
        <ifCall name="Q{http://saxonica.com/ns/interactiveXSLT}get" type="item()*">
         <dot type="element(Q{}div)"/>
         <str val="classList"/>
        </ifCall>
       </check>
       <str val="toggle"/>
       <arrayBlock>
        <str val="fig"/>
       </arrayBlock>
      </ifCall>
      <varRef name="vv:v0" slot="0"/>
     </filter>
    </let>
   </templateRule>
  </mode>
 </co>
 <co id="1" binds="">
  <template name="Q{http://www.w3.org/1999/XSL/Transform}initial-template" flags="os" line="9" module="file:/C:/Users/Martin%20Honnen/Documents/GitHub/martin-honnen.github.io/xslt/2017/./test2017122001.xsl" slots="0">
   <resultDoc role="body" baseUri="file:/C:/Users/Martin%20Honnen/Documents/GitHub/martin-honnen.github.io/xslt/2017/./test2017122001.xsl" ns="xsl=~ ixsl=~ xs=~" line="10" global="#&#xD;&#xA;#Wed Dec 20 21:28:08 CET 2017&#xD;&#xA;method=xml&#xD;&#xA;" local="#&#xD;&#xA;#Wed Dec 20 21:28:08 CET 2017&#xD;&#xA;">
    <str role="href" val="#saxon-target"/>
    <elem role="content" line="11" name="div" nsuri="">
     <sequence>
      <att name="class" flags="l">
       <str val="responsive"/>
      </att>
      <valueOf flags="l">
       <str val="This is a test."/>
      </valueOf>
     </sequence>
    </elem>
   </resultDoc>
  </template>
 </co>
 <co id="2" binds="">
  <mode onNo="TC" flags="dWe" patternSlots="0"/>
 </co>
 <overridden/>
 <output>
  <property name="{http://saxon.sf.net/}stylesheet-version" value="30"/>
 </output>
 <decimalFormat/>
</package>
<?Σ a11ebf99?>
