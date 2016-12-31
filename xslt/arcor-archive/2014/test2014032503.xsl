<?xml version="1.0" encoding="UTF-8"?>
        <html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <head>
          <title>Test</title>
          <script><![CDATA[
          function toggle(summary) {
            var details = summary.parentNode;
            if (details.nodeType === 1 && details.tagName.toLowerCase() === 'details')
            {
              if (typeof details.open === 'undefined')
              {
                var div = details.getElementsByTagName('div')[0];
                if (div) {
                  div.style.display = div.style.display === '' ? 'none' : '';
                }
              }
            }
          }
          ]]></script>
          <style>details { display: block;}</style>
        </head>
        <body style="font-family:Arial;font-size:12pt;background-color:#EEEEEE">
        <xsl:for-each select="LogFileProcessing/Test/Script">
          <details>
            <summary style="font-family:Arial;background-color:teal;color:white;padding:4px" onclick="toggle(this);">
            
            <span style="font-family:Arial;font-weight:bold"><xsl:value-of select="Name"/></span>
            </summary>
            <div style="font-family:Arial;margin-left:75px;margin-bottom:1em;font-size:10pt">
            
        <table border="1">
                <tr style="color:white" bgcolor="Teal">
                <th>Run</th>
      <th>Date</th>
      <th>Start Time</th>
      <th>End Time</th>
      <th>Duration</th>
      <th>Pass/Fail</th>
      <th>Reason</th>
    </tr>
    <xsl:for-each select="Results/RunResult">
    <tr>
      <xsl:choose>
        <xsl:when test="Outcome = 'Fail'">
          <td bgcolor="Red">
          <xsl:value-of select="RunNumber"/>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td bgcolor="White"><xsl:value-of select="RunNumber"/></td>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="Outcome = 'Fail'">
          <td bgcolor="Red">
          <xsl:value-of select="Date"/>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td bgcolor="White"><xsl:value-of select="Date"/></td>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="Outcome = 'Fail'">
          <td bgcolor="Red">
          <xsl:value-of select="StartTime"/>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td bgcolor="White"><xsl:value-of select="StartTime"/></td>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="Outcome = 'Fail'">
          <td bgcolor="Red">
          <xsl:value-of select="EndTime"/>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td bgcolor="White"><xsl:value-of select="EndTime"/></td>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="Outcome = 'Fail'">
          <td bgcolor="Red">
          <xsl:value-of select="Duration"/>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td bgcolor="White"><xsl:value-of select="Duration"/></td>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="Outcome = 'Fail'">
          <td bgcolor="Red">
          <xsl:value-of select="Outcome"/>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td bgcolor="White"><xsl:value-of select="Outcome"/></td>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="Outcome = 'Fail'">
          <td bgcolor="Red">
          <xsl:value-of select="FailureReason"/>
          </td>
        </xsl:when>
        <xsl:otherwise>
          <td bgcolor="White"><span>N/A</span></td>
        </xsl:otherwise>
      </xsl:choose>
    </tr>
    </xsl:for-each>
  </table>
  </div>
  </details>
</xsl:for-each>
</body>
</html>
