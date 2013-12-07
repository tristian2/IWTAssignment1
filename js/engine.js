var globalQuery="";



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
	//////debugger;
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
	//////debugger;
	var parser = new DOMParser();
	var doc = parser.parseFromString(xhr.responseText, "application/xml");
	return doc;
}

function beginProcessing(load) {
	var xmlDoc= getXML("xml/remakes.xml");
	//console.log("the xml file:"+xmlDoc);
	
	var stylesheet = getXSL("xml/remakes.xsl");
	//$("#remakeQuery").val("remakes/remake[ryear=1988]");
	//var remakeQuery = $("#remakeQuery").val();
	if(load)
		$(stylesheet).find("xsl\\:for-each").first().attr("select",parseQuery());
	//$(stylesheet).find("xsl\\:sort").first().attr("select",parseQuery());
	
	//console.log("the stylesheet file:"+stylesheet);
	//////debugger;
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
	
	//console.log("loaded");
}

function parseQuery() {
	var tempquery="";
	/*
	 * remakes/remake[ryear=1990]
	 * title wildcard
	 * rtitle range  remakes/remake[contains(rtitle,'Perdita')]|remakes/remake[contains(rtitle,'Noir')]
	 * syear range
	 * fraction, range
	 * 
	 */			
	 //////debugger;	
	 /*
	 query=query+"remakes/remake[contains(rtitle,\'"+$("#remakeTitle").val()+"\')] | ";
	 query=query+"remakes/remake[ryear="+$("#remakeYear").val().toString()+"] | ";
	 query=query+"remakes/remake[contains(stitle,\'"+$("#originalTitle").val()+"\')] | "; 
	 query=query+"remakes/remake[syear="+$("#originalYear").val().toString()+"] | ";  
	 query=query+"remakes/remake[fraction="+$("#remakeFraction").val().toString() +"]";   
	*/
 	tempquery=tempquery+"remakes/remake[ryear="+$("#remakeYear").val().toString()+"] ";
    //console.log("parseQuery:"+tempquery);

	return globalQuery;


}

function sort(column) {

	console.log("gonna sort by:"+column);


}
//var query = "";

function buildQuery() {
	
	var tempQuery = "";
	$.each( $(".formElement"), function(key,value) {
		//console.log("key:"+key+" value:"+value);
		//////debugger;
		switch(value.id) {
			
			case "remakeTitle":
				console.log("remakeTitle");
				if( value.value!="")	
					tempQuery = parseTitle(value.value, "remake title","remakeTitle","rtitle");				
				break;
			case "remakeFraction":
				console.log("remakeFraction");
				break;
			case "originalYear":
				console.log("originalYear", "original year");
				if( value.value!="")	
					tempQuery = parseYear(value.value, "original year","originalYear","syear");				
				break;
			case "remakeYear":
				console.log("remakeYear");
				if( value.value!="")	
					tempQuery = parseYear(value.value, "remake year","remakeYear","ryear");
				break;
			case "originalTitle":
				console.log("originalTitle");
				if( value.value!="")	
					tempQuery = parseTitle(value.value, "original title","originalTitle","stitle");				
				break;
		}
		//console.log("query:"+tempQuery);
		
		//Object[ property value = "" attribute value = "null", input#remakeYear.formElement property value = "1931" attribute value = "null", input#originalTitle.formElement property value = "" attribute value = "null", input#originalYear.formElement property value = "" attribute value = "null", input#remakeFraction.formElement property value = "0.8" attribute value = "null"]
	});
}

function parseTitle(term, origin, control,node) {
	var titleQuery = "";
	var valid = false;
//debugger;
	if( term!=""){
 		valid=true; 

		//xslt is case sensitive, users are not!
		 titleQuery=titleQuery+"remakes/remake[contains(translate("+node+",$smallcase,$uppercase), translate(\'"+term+"\',$smallcase,$uppercase))] "+ $('input[name=refine]:radio:checked')[0].value + " "; 

		//for now
		globalQuery = titleQuery.substr(0,titleQuery.length-2);
		//console.log("globalQuery:"+globalQuery);
	} 
						  
	return titleQuery; 
}
function parseYear(term, origin, control,node) {
	var yearQuery = "";
	var valid = false;
	var operator = "=";
	//debugger;
	//four consitions, <,>,=,yyyy maybe more later
	if( term.indexOf("<")>-1){
		term=term.substr(1,term.length);
		operator="<";
	}
		//add part to year query 
	if( term.indexOf("=")>-1){
		term=term.substr(1,term.length);
		operator="=";
	}
		//add part to year query 
	if( term.indexOf(">")>-1){
		term=term.substr(1,term.length);
		operator=">";
	}
		//add part to year query 
		
	//pattern to validate year /\d{4}/
	var url = /\d{4}/;

	if( term.match(url)!=null){
 		valid=true; 
		//query=query+"remakes/remake["+node+"="+$("#originalYear").val().toString()+"] | ";  
		yearQuery=yearQuery+"remakes/remake["+node+operator+term+"] " + $('input[name=refine]:radio:checked')[0].value +" ";  
		
		//for now
		globalQuery = yearQuery.substr(0,yearQuery.length-2);
		//console.log("globalQuery:"+globalQuery);
	} 
						  
	return yearQuery; 
}

var error="";
$(document).ready(function() {
	console.clear();
	beginProcessing(false);
	
	$("#run").click(function () { 
	  //debugger;
	  console.log("run pressed");
	  globalQuery="";
	  buildQuery();
	  console.log("GLOBALQUERY:"+globalQuery);
	  beginProcessing(true);
	});
});

			

/*
$(document).ready(function() {
	////////debugger;
	// Handler for .ready() called.
	var xmlDoc = getXSL("xml/remakes.xsl");
	//$(xmlDoc).find("xsl\\:for-each").first().attr("select");
	
	//$(xmlDoc).find("xsl\\:for-each").first().attr("select","remakes/remake[ryear=1988]");
	//$(xmlDoc).find("xsl\\:for-each").first().attr("select");
	beginProcessing();
	/*
	$("#remakeTitle").change(function() {
	 	console.log("Handler for .change() called.");
	 	parseQuery();
	 	beginProcessing();
	});
	//year of remake
	$("#remakeYear").change(function() {
	 	console.log("Handler for .change() called.");
	 	parseQuery();
	 	beginProcessing();
	});
	/*
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
	
	//fraction
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
*/
			
