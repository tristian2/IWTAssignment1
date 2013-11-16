<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
	 <html>
		  <body>
		    <table border="2" bgcolor="yellow">
		      <tr>
		        <th>Title</th>
		        <th>Year</th>
		        <th>Fraction</th>
		        <th>Remake</th>
		        <th>Remake Year</th>
		      </tr>
		      <xsl:for-each select="remakes/remake">
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