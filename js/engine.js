function getXML(xmlUrl) {
	var xhr = $.ajax({
		url: xmlUrl,
		datatype: "xml",
		contentType: "application/xml",
		async: false,
		success: function(response) {
        	//console.log("success"+response);
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
        	//console.log("success"+response);
        }
	});
	//debugger;
	var parser = new DOMParser();
	var doc = parser.parseFromString(xhr.responseText, "application/xml");
	return doc;
}

function beginProcessing() {
	var xmlDoc= getXML("xml/remakes.xml");
	//console.log("the xml file:"+xmlDoc);
	
	var stylesheet = getXSL("xml/remakes.xsl");
	//$("#remakeQuery").val("remakes/remake[ryear=1988]");
	var remakeQuery = $("#remakeQuery").val();
	$(stylesheet).find("xsl\\:for-each").first().attr("select",parseQuery());
	
	
	//console.log("the stylesheet file:"+stylesheet);
	//debugger;
	if(typeof(XSLTProcessor)!="undefined") {
		var processor = new XSLTProcessor();
		processor.importStylesheet(stylesheet);
		var result = processor.transformToFragment(xmlDoc,document);
		//console.log(result);
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

function parseQuery() {
	var query="";
	/*
	 * remakes/remake[ryear=1990]
	 * title wildcard
	 * rtitle range  remakes/remake[contains(rtitle,'Perdita')]|remakes/remake[contains(rtitle,'Noir')]
	 * syear range
	 * fraction, range
	 * 
	 */			
	 //debugger;	
	 query=query+"remakes/remake[contains(rtitle,\'"+$("#remakeTitle").val()+"\')] | ";
	 query=query+"remakes/remake[ryear="+$("#remakeYear").val().toString()+"] | ";
	 query=query+"remakes/remake[contains(stitle,\'"+$("#originalTitle").val()+"\')] | "; 
	 query=query+"remakes/remake[syear="+$("#originalYear").val().toString()+"] | ";  
	 query=query+"remakes/remake[fraction="+$("#remakeFraction").val().toString() +"]";   

    console.log("parseQuery:"+query);

	return query;


}

function sort(column) {

	console.log("gonna sort by:"+column);


}




$(document).ready(function() {
	// Handler for .ready() called.
	var xmlDoc = getXSL("xml/remakes.xsl");
	//$(xmlDoc).find("xsl\\:for-each").first().attr("select");
	
	//$(xmlDoc).find("xsl\\:for-each").first().attr("select","remakes/remake[ryear=1988]");
	//$(xmlDoc).find("xsl\\:for-each").first().attr("select");
	beginProcessing();
	$("#remakeTitle").change(function() {
	 	console.log("Handler for .change() called.");
	 	parseQuery();
	 	beginProcessing();
	});
	$("#remakeYear").change(function() {
	 	console.log("Handler for .change() called.");
	 	parseQuery();
	 	beginProcessing();
	});
	$("#originalTitle").change(function() {
	 	console.log("Handler for .change() called.");
	 	parseQuery();
	 	beginProcessing();
	});
	$("#originalYear").change(function() {
	 	console.log("Handler for .change() called.");
	 	parseQuery();
	 	beginProcessing();
	});
	$("#remakeFraction").change(function() {
	 	console.log("Handler for .change() called.");
	 	parseQuery();
	 	beginProcessing();
	});
	
	
	
	$("#rtitle").click(function () { 
	  console.log("sort by:"+$(this));
	  sort(this.id);
	});
    $("#ryear").click(function () { 
	  console.log("sort by:"+$(this));
	  sort(this.id);
	});
    $("#fraction").click(function () { 
	  console.log("sort by:"+$(this));
	  sort(this.id);
	});
	$("#stitle").click(function () { 
	  console.log("sort by:"+$(this)); 
	  sort(this.id);
	});
    $("#syear").click(function () { 
	  console.log("sort by:"+$(this));
	  sort(this.id);
	});
		        
	
});
			
