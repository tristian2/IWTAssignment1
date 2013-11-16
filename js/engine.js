function getXML(xmlUrl) {
	debugger;
	var xhr = $.ajax({
		url: xmlUrl,
		datatype: "xml",
		contentType: "application/xml",
		async: false
	});
	return xhr.responseXML;
}


function beginProcessing() {
	var xmlDoc= getXML("xml/remakes.xml");
	console.log("the xml file:"+xmlDoc);
	var stylesheet = getXML("xml/remakes.xsl");
	console.log("the stylesheet file:"+stylesheet);
	debugger;
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


$( document ).ready(function() {
	// Handler for .ready() called.
	beginProcessing();
});