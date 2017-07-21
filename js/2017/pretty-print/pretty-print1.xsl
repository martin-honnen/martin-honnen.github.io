<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

<!-- The following is not used because of a bug in Mozilla :( -->
<!--
  <xsl:key name="kattPref" match="@*" 
   use="concat(generate-id(..), '|', substring-before(., ':'))"/>
-->  
  <xsl:output method="html"/>  
  <xsl:template match="/">                
     
      <div class="pretty-print" onclick="prettyPrintCollapseExpandHandler(event);">        
        <xsl:apply-templates/>      
      </div>    
 
  </xsl:template>  
  
  <xsl:template match="*">        
    <div class="indent">      
      <span class="markup">&lt;</span>      
      
      <xsl:variable name="class" select="'elemname'"/>
    
      
      <span class="{$class}">        
        <xsl:value-of select="name(.)"/>      
      </span>
      
      <xsl:call-template name="findNamespace"/>
                       
      <xsl:apply-templates select="@*"/>      
      <span class="markup">/></span>    
    </div>  
  </xsl:template>  

  <xsl:template match="*[text()]">    
    
    <xsl:variable name="class" select="'elemname'"/>   
    
    <div class="indent">      
      <span class="markup">&lt;</span>      
      <span class="{$class}">        
        <xsl:value-of select="name(.)"/>      
      </span>

      <xsl:call-template name="findNamespace"/>
                       
      <xsl:apply-templates select="@*"/>      
      <span class="markup">></span>      
      <!--<span class="text">        
        <xsl:value-of select="."/>      -->
        <xsl:apply-templates/>
      <!--</span>-->      
      <span class="markup">&lt;/</span>      
      <span class="elemname">        
        <xsl:value-of select="name(.)"/>      
      </span>      
      <span class="markup">></span>    
    </div>  
  </xsl:template>  
  
  <xsl:template match="*[* or processing-instruction() or comment() 
                         or string-length(text()) > 50]" priority="10">    
    
    <xsl:variable name="class" select="'elemname'"/>    

    <table>      
      <tr>        
        <td class="expander">
          -
          <div/>        
        </td>        
        <td>          
          <span class="markup">&lt;</span>          
          <span class="{$class}">            
            <xsl:value-of select="name(.)"/>          
          </span>          
          <xsl:call-template name="findNamespace"/>
          <xsl:apply-templates select="@*"/>          
          <span class="markup">></span>          
          <div class="expander-content">            
            <xsl:apply-templates/>          
          </div>          
          <span class="markup">&lt;/</span>          
          <span class="elemname">            
            <xsl:value-of select="name(.)"/>          
          </span>          
          <span class="markup">></span>        
        </td>      
      </tr>    
    </table>  
  </xsl:template>  
  <xsl:template match="@*">        

    <xsl:variable name="vPos" select="position()"/>
    
    <xsl:variable name="vPref" select="substring-before(name(), ':')"/>

    <xsl:if test="$vPref 
               and 
                  not(../@*[position() &lt; $vPos]
                           [substring-before(name(), ':') 
                           = $vPref]
                      )">
      <xsl:call-template name="findNamespace"/>
    </xsl:if>

<!-- The following is not used because of a bug in Mozilla :( -->

<!--
    <xsl:if test=
    "generate-id() 
    = 
     generate-id(key('kattPref', 
                      concat(generate-id(..), '|', substring-before(., ':'))
                     )[1]
                )">
      <xsl:call-template name="findNamespace"/>
    </xsl:if>
-->
    <xsl:variable name="class" select="'attrname'"/>
    
    <xsl:variable name="class2" select="'markup'"/>
    
    <xsl:variable name="class3" select="'attrvalue'"/>

    <xsl:text> </xsl:text>    
    <span class="{$class}">      
      <xsl:value-of select="name(.)"/>    
    </span>    
    <span class="{$class2}">="</span>    
    <span class="{$class3}">      
      <!-- <xsl:value-of select="."/> -->    
      <xsl:call-template name="replaceAmpersands">
        <xsl:with-param name="vString" select="string(.)"/>
      </xsl:call-template>
    </span>    
    <span class="{$class2}">"</span>  
  </xsl:template>  
  
  <xsl:template match="text()">    
    
    <xsl:variable name="class" select="'text'"/>

    
    <span class="{$class}">        
      <!-- <xsl:value-of select="."/>       -->
      <xsl:call-template name="replaceAmpersands">
        <xsl:with-param name="vString" select="string(.)"/>
      </xsl:call-template>
    </span>    
  </xsl:template>  
  
  <xsl:template match="processing-instruction()">    
    
    <xsl:variable name="class" select="'indent pi'"/>
    
    <div class="{$class}">

      &lt;?
      <xsl:value-of select="name(.)"/>      
      <xsl:text> </xsl:text>      
      <xsl:value-of select="."/>
?>
    
    </div>  
  </xsl:template>  

  <xsl:template match="processing-instruction()[string-length(.) > 50]">    
    
    <xsl:variable name="class" select="'pi'"/>
    
    <xsl:variable name="class2" select="'indent expander-content'"/>
    
    <table>      
      <tr>        
        <td class="expander">
          -          
          <div/>        
        </td>        
        <td class="{$class}">

          &lt;?
          <xsl:value-of select="name(.)"/>          
          <div class="{$class2}">            
            <xsl:value-of select="."/>          
          </div>          
          <xsl:text>?></xsl:text>        
        </td>      
      </tr>    
    </table>  
  </xsl:template>  

  <xsl:template match="comment()">    
    
    <xsl:variable name="class" select="'comment indent'"/>
    
    <div class="{$class}">      
      &lt;!--
      <xsl:value-of select="."/>
      -->    
    </div>  
  </xsl:template>  

  <xsl:template match="comment()[string-length(.) > 50]">    
    
    <xsl:variable name="class" select="'comment'"/>
 
    <xsl:variable name="class2" select="'indent expander-content'"/>
    
    <table>      
      <tr>        
        <td class="expander">
          -          
          <div/>        
        </td>        
        <td class="{$class}">          
          &lt;!--            
          <div class="{$class2}">              
            <xsl:value-of select="."/>            
          </div>          
          -->        
        </td>      
      </tr>    
    </table>  
  </xsl:template>
  
  <xsl:template name="findNamespace">
  
    <xsl:variable name="vName" select="substring-before(name(), ':')"/>
    <xsl:variable name="vUri" select="namespace-uri(.)"/>

    <xsl:variable name="vAncestNamespace">
      <xsl:call-template name="findAncNamespace">
        <xsl:with-param name="pName" select="$vName"/>
        <xsl:with-param name="pUri" select="$vUri"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:if test="not(number($vAncestNamespace))">
      <xsl:if test="namespace-uri()
                  or
                    not(generate-id() 
                       = 
                        generate-id(../@*[name() 
                                         = 
                                          name(current())]
                                    )
                        )">
        <xsl:if test="parent::* or namespace-uri() or contains(name(), ':')">
          <xsl:text> </xsl:text>    
          <span class="namespace">      
            <xsl:value-of select="'xmlns'"/>
            <xsl:if test="contains(name(), ':')">
              <xsl:value-of select="concat(':', $vName)"/>
            </xsl:if>
          </span>    
          <span class="markup">="</span>    
          <span class="namespace">      
            <xsl:value-of select="namespace-uri()"/>    
          </span>    
          <span class="markup">"</span> 
        </xsl:if> 
      </xsl:if>
    </xsl:if>
  </xsl:template>
  
  <xsl:template name="findAncNamespace">
    <xsl:param name="pNode" select="."/>
    <xsl:param name="pName" select="substring-before(name(), ':')"/>
    <xsl:param name="pUri" select="namespace-uri(.)"/>
   
     <xsl:choose>
      <xsl:when test="not($pNode/parent::*) 
                     and not($pName) and not($pUri)">1</xsl:when>
      <xsl:when test="not($pNode/parent::*)">0</xsl:when>
      <xsl:otherwise>
        <xsl:variable name="vSamePrefs" 
        select="number($pName
                      = substring-before(name($pNode/..), ':')
                      )"/>
                      
        <xsl:variable name="vSameUris" 
         select="number($pUri  = namespace-uri($pNode/..))"/>
                      
        <xsl:choose>
          <xsl:when test="$vSamePrefs and not($vSameUris)">0</xsl:when>
          <xsl:when test="not($vSamePrefs)">
            <xsl:call-template name="findAncNamespace">
              <xsl:with-param name="pNode" select="$pNode/.."/>
              <xsl:with-param name="pName" select="$pName"/>
              <xsl:with-param name="pUri" select="$pUri"/>
            </xsl:call-template>
          </xsl:when>
           <xsl:otherwise>1</xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
    
  </xsl:template>
  
  <xsl:template name="replaceAmpersands">
    <xsl:param name="vString"/>
   
   <xsl:variable name="vAmp">&amp;</xsl:variable>
   
   <xsl:choose>
   <xsl:when test="contains($vString, $vAmp)">
     <xsl:value-of select="substring-before($vString, $vAmp)"/>
     <xsl:value-of select="concat($vAmp, 'amp;')"/>
     <xsl:call-template name="replaceAmpersands">
       <xsl:with-param name="vString" 
       select="substring-after($vString, $vAmp)"/>
     </xsl:call-template>
   </xsl:when>
   <xsl:otherwise>
     <xsl:value-of select="$vString"/>
   </xsl:otherwise>
   </xsl:choose>
   
  </xsl:template>
</xsl:stylesheet>
