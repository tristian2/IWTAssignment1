<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msws="http://tempuri.org/">
<xsl:output method="html" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" indent="yes"/>
    <xsl:template match="/">
	 <html xmlns="http://www.w3.org/1999/xhtml">
		  <body>
		    <table border="0">
		      <tr>
		        <th>Title</th>
		        <th>Year</th>
		        <th>Fraction</th>
		        <th>Remake</th>
		        <th>Remake Year</th>
		      </tr>
		      <xsl:for-each select="remakes/remake[ryear=1990]">
		      <tr>
		        <td><xsl:value-of select="rtitle"/></td>
		        <td><xsl:value-of select="ryear"/></td>
		        <td><xsl:value-of select="fraction"/></td>
		        <td><xsl:value-of select="stitle"/></td>
		        <td><xsl:value-of select="syear"/></td>
		      </tr>
		      </xsl:for-each>
		    </table>
		  </body>
	  </html>
    </xsl:template>
</xsl:stylesheet>