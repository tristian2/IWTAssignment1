function getXML(xmlUrl) {
	var xhr = $.ajax({
		url: xmlUrl,
		datatype: "xml",
		contentType: "application/xml",
		async: false,
		success: function(response) {
        	console.log("success"+response);
        }
	});
	//debugger;
	return xhr.responseXML;
}

function getXSL(xmlUrl) {
	var xhr = $.ajax({
		url: xmlUrl,
		datatype: "xml",
		contentType: "application/xml",
		async: false,
		success: function(response) {
        	console.log("success"+response);
        }
	});
	//debugger;
	var parser = new DOMParser();
	var doc = parser.parseFromString(xhr.responseText, "application/xml");
	return doc;
}

function beginProcessing() {
	var xmlDoc= getXML("xml/remakes.xml");
	console.log("the xml file:"+xmlDoc);
	
	var stylesheet = getXSL("xml/remakes.xsl");
	
	var remakeQuery = $("#remakeQuery").val();
	$(stylesheet).find("xsl\\:for-each").first().attr("select",remakeQuery);
	
	
	console.log("the stylesheet file:"+stylesheet);
	//debugger;
	if(typeof(XSLTProcessor)!="undefined") {
		var processor = new XSLTProcessor();
		processor.importStylesheet(stylesheet);
		var result = processor.transformToFragment(xmlDoc,document);
		console.log(result);
		//document.getElementById("target").appendChild(result);
		
		$( "#target" ).css( "border", "3px solid red" );
		$( "#target" ).html(result);
				
	}
	else {
		document.writeln("your browser does not support this code.  contact the administrator");
		console.log("unsupported browser");
	}
	
	console.log("loaded");
}

$(document).ready(function() {
	// Handler for .ready() called.
	var xmlDoc = getXSL("xml/remakes.xsl");
	$(xmlDoc).find("xsl\\:for-each").first().attr("select");
	
	$(xmlDoc).find("xsl\\:for-each").first().attr("select","remakes/remake[ryear=1988]");
	$(xmlDoc).find("xsl\\:for-each").first().attr("select");
	beginProcessing();
});