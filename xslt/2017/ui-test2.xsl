<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:math="http://www.w3.org/2005/xpath-functions/math"
    xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
    xmlns:js="http://saxonica.com/ns/globalJS"
    exclude-result-prefixes="xs math ixsl js"
    version="3.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="#header">
            <hr/>
        </xsl:result-document>
        <xsl:result-document href="#editor">
            <table border="1">
                <tr bgcolor="#999999">
                    <th colspan="2">Form</th>
                </tr>
                <xsl:apply-templates select="data/date"/>
            </table>
        </xsl:result-document>
        <xsl:result-document href="#footer">
            <hr/>
        </xsl:result-document>
    </xsl:template>
    <xsl:template match="date">
        <tr>
            <td>Date:</td>
            <td>
                <xsl:variable name="currentValue" select="string-join((@month, @day, @year), '/')"/>
                <xsl:value-of select="$currentValue"/>
                <br/>
                <input type="text" id="datepicker{position()}"/>
                <ixsl:schedule-action wait="1">
                    <xsl:call-template name="init-datepicker">
                        <xsl:with-param name="id" select="'#datepicker' || position()"/>
                        <xsl:with-param name="value" select="$currentValue"/>
                    </xsl:call-template>
                </ixsl:schedule-action>                
            </td>
        </tr>
    </xsl:template>
    
    <xsl:template name="init-datepicker">
        <xsl:param name="id" as="xs:string"/>
        <xsl:param name="value" as="xs:string"/>
        <!--<xsl:sequence select="trace(js:initDP($id, $value), 'init-datepicker called for ' || $id || ' at ' || current-dateTime())"/>-->
        <xsl:sequence select="js:initDP($id, $value)"/>
    </xsl:template>
    
</xsl:stylesheet>
