<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msws="http://tempuri.org/">
<xsl:output method="html" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" indent="yes"/>
<xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
 <xsl:template match="/">
	 <html xmlns="http://www.w3.org/1999/xhtml">
		  <body>
		    <table border="1" id="movieTable">
		      <thead> 
			      <tr>	
					<th><span id="rtitle" class="filmheading">Remake</span></th>
			        <th><span id="ryear" class="filmheading">Remake Year</span></th>
			        <th><span id="fraction" class="filmheading">Fraction</span></th>
			        <th><span id="stitle" class="filmheading">Title</span></th>
			        <th><span id="syear" class="filmheading">Year</span></th>
			      </tr>
		      </thead> 
		      <xsl:for-each select="remakes/remake">
		      <xsl:sort select="rtitle"/>
		      <tr>
		        <td><xsl:value-of select="rtitle"/></td>
		        <td><xsl:value-of select="ryear"/></td>
		        <td class="ratingCell">
		        	<div class="fractionvalue"><xsl:value-of select="fraction"/></div>
		        	<div><img class="ratingImg" src="css/5stars.png">  
						<xsl:attribute name="style">
							clip:rect(0px,<xsl:value-of select="fraction*100" />px,100px,0px);
						</xsl:attribute>
		        	</img>	</div>	        
		        </td>
		        <td><xsl:value-of select="stitle"/></td>
		        <td><xsl:value-of select="syear"/></td>
		      </tr>
		      </xsl:for-each>
		    </table>
		  </body>
	  </html>
    </xsl:template>
</xsl:stylesheet>