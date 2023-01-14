<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="processorTest3.xml"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="3.0">
    
    <xsl:output
        method="html"
        version="5"
        encoding="UTF-8"
        html-version="5"/>
    
    <xsl:template match="/" name="xsl:intial-template">
        <xsl:variable name="title" at="xs:string" select="concat('XSLT 3.0 system properties ', system-property('xsl:product-name'), ' ', system-property('xsl:product-version'))"/>
        <html lang="en">
            <head>
                <title><xsl:value-of select="$title"/></title>
                <style type="text/css">
                    tr:nth-child(even) { background-color: #D3D3D3; }
                    tr:nth-child(odd) { background-color: #FFF; }
                </style>
            </head>
            <body>
                <h1><xsl:value-of select="$title"/></h1>
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>property name</th>
                                <th>property value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>xsl:version</code></td>
                                <td><xsl:value-of select="system-property('xsl:version')"/></td>
                            </tr>
                            <tr>
                                <td><code>xsl:vendor</code></td>
                                <td><xsl:value-of select="system-property('xsl:vendor')"/></td>
                            </tr>
                            <tr>
                                <td><code>xsl:vendor-url</code></td>
                                <td><a href="{system-property('xsl:vendor-url')}"><xsl:value-of select="system-property('xsl:vendor-url')"/></a></td>
                            </tr>
                            <tr>
                                <td><code>xsl:product-name</code></td>
                                <td><xsl:value-of select="system-property('xsl:product-name')"/></td>
                            </tr>
                            <tr>
                                <td><code>xsl:product-version</code></td>
                                <td><xsl:value-of select="system-property('xsl:product-version')"/></td>
                            </tr>
                            <tr>
                                <td><a href="https://www.w3.org/TR/xslt-30/#dt-schema-aware-xslt-processor"><code>xsl:is-schema-aware</code></a></td>
                                <td><xsl:value-of select="system-property('xsl:is-schema-aware')"/></td>
                            </tr>
                            <tr>
                                <td><code>xsl:xpath-version</code></td>
                                <td><xsl:value-of select="system-property('xsl:xpath-version')"/></td>
                            </tr>
                            <tr>
                                <td><code>xsl:xsd-version</code></td>
                                <td><xsl:value-of select="system-property('xsl:xsd-version')"/></td>
                            </tr>
                            <tr>
                                <td><a href="https://www.w3.org/TR/xslt-30/#dt-hof-feature"><code>xsl:supports-higher-order-functions</code></a></td>
                                <td><xsl:value-of select="system-property('xsl:supports-higher-order-functions')"/></td>
                            </tr>
                            <tr>
                                <td><a href="https://www.w3.org/TR/xslt-30/#streaming-feature"><code>xsl:supports-streaming</code></a></td>
                                <td><xsl:value-of select="system-property('xsl:supports-streaming')"/></td>
                            </tr>
                            <tr>
                                <td><a href="https://www.w3.org/TR/xslt-30/#dynamic-evaluation-feature"><code>xsl:supports-dynamic-evaluation</code></a></td>
                                <td><xsl:value-of select="system-property('xsl:supports-dynamic-evaluation')"/></td>
                            </tr>
                            <tr>
                                <td><a href="https://www.w3.org/TR/xslt-30/#dt-1.0-compatibility-feature"><code>xsl:supports-backwards-compatibility</code></a></td>
                                <td><xsl:value-of select="system-property('xsl:supports-backwards-compatibility')"/></td>
                            </tr>
                            <tr>
                                <td><code>xsl:supports-namespace-axis</code></td>
                                <td><xsl:value-of select="system-property('xsl:supports-namespace-axis')"/></td>
                            </tr>  
                            <tr>
                                <td><a href="https://www.w3.org/TR/xslt-30/#dt-serialization-feature"><code>xsl:supports-serialization</code></a></td>
                                <td><xsl:value-of select="system-property('xsl:supports-serialization')"/></td>
                            </tr>  
                            <tr>
                                <td><code>msxsl:version</code></td>
                                <td><xsl:value-of xmlns:msxsl="urn:schemas-microsoft-com:xslt" select="system-property('msxsl:version')"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>
