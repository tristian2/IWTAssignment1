var globalQuery="";



function getXML(xmlUrl) {
	var xhr = $.ajax({
		url: xmlUrl,
		datatype: "xml",
		contentType: "application/xml",
		async: false,
		success: function(response) {
        }
	});
	return xhr.responseXML;
}

function getXSL(xmlUrl) {
	var xhr = $.ajax({
		url: xmlUrl,
		datatype: "xml",
		contentType: "application/xml",
		async: false,
		success: function(response) {
        }
	});

	var parser = new DOMParser();
	var doc = parser.parseFromString(xhr.responseText, "application/xml");
	return doc;
}

function beginProcessing(load,sort) {
	var xmlDoc= getXML("xml/remakes.xml");
	var stylesheet = getXSL("xml/remakes.xsl");
	
	if(load){
		$(stylesheet).find("xsl\\:for-each ,for-each").first().attr("select",parseQuery());
		
	}
	if(!!sort) {
		console.log("sort:"+$(stylesheet).find("xsl\\:sort, sort").first().attr("select"));
		$(stylesheet).find("xsl\\:sort, sort").first().attr("select","ryear");
	}

	if(typeof(XSLTProcessor)!="undefined") {
		var processor = new XSLTProcessor();

		try{
			processor.importStylesheet(stylesheet);
			var result = processor.transformToFragment(xmlDoc,document);
			try {
				$.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 

				//not ideal, but no consistent way to count child nodes across browsers!
				if($.browser.chrome){
				  console.log("size:(chrome)"+result.childNodes[1].children[1].childNodes.length);
				
				} else {
					console.log("size:"+result.childNodes[0].lastChild.firstChild.childNodes[1].childNodes.length);
				}

				$( "#target" ).css( "border", "3px solid red" );
				$( "#target" ).html(result);
			}
			catch(err)
			{
				console.log("Error description: " + err.message);
				$( "#target" ).text("sorry, no movies!");
			}		
		}
		catch(err) {
				console.log("Error description: " + err.message);
				$( "#target" ).text("sorry, no movies, have you checked the terms you have entered, maybe your year isnt valid?");
		}
	}
	else {
		document.writeln("your browser does not support this code.  contact the administrator");
		console.log("unsupported browser");
	}

}

function parseQuery() {
	var tempquery="";

	globalQuery = globalQuery.substr(0,globalQuery.length-2);
	return globalQuery;

}

function sort(column) {

	console.log("gonna sort by:"+column);


}

function buildQuery() {
	
	var tempQuery = "";
	$.each( $(".formElement"), function(key,value) {

		switch(value.id) {
			
			case "remakeTitle":
				if( value.value!="")	
					tempQuery = parseTitle(value.value, "remake title","remakeTitle","rtitle");				
				break;
			case "remakeFraction":
				break;
			case "originalYear":
				if( value.value!="")	
					tempQuery = parseYear(value.value, "original year","originalYear","syear");				
				break;
			case "remakeYear":
				if( value.value!="")	
					tempQuery = parseYear(value.value, "remake year","remakeYear","ryear");
				break;
			case "originalTitle":
				if( value.value!="")	
					tempQuery = parseTitle(value.value, "original title","originalTitle","stitle");				
				break;
		}
	});
}

function parseTitle(term, origin, control,node) {
	var titleQuery = "";
	var valid = false;
	
	if( term!=""){
 		valid=true; 

		//xslt is case sensitive, users are not!
		 titleQuery=titleQuery+"remakes/remake[contains(translate("+node+",$smallcase,$uppercase), translate(\'"+term+"\',$smallcase,$uppercase))] "+ $('input[name=refine]:radio:checked')[0].value + " "; 
		//for now
		globalQuery = globalQuery + titleQuery;
	} 
						  
	return titleQuery; 
}
function parseYear(term, origin, control,node) {
	var yearQuery = "";
	var valid = false;
	var operator = "=";
	var url = /\d{4}/;

	if( term.indexOf("<")>-1){
		term=term.substr(1,term.length);
		operator="<";
	}
	if( term.indexOf("=")>-1){
		term=term.substr(1,term.length);
		operator="=";
	}
	if( term.indexOf(">")>-1){
		term=term.substr(1,term.length);
		operator=">";
	}

	if( term.match(url)!=null){
 		valid=true; 
		yearQuery=yearQuery+"remakes/remake["+node+operator+term+"] " + $('input[name=refine]:radio:checked')[0].value +" ";  
		
		//for now
		globalQuery = globalQuery + yearQuery;
	} 
						  
	return yearQuery; 
}

var error="";
$(document).ready(function() {
	console.clear();
	
	
	beginProcessing(false,false);
	
	$("#run").click(function () { 
	  globalQuery="";
	  buildQuery();
	  beginProcessing(true,false);
	});
	
	$("#reset").click(function () { 
		location.reload(true);
	});
	
	$("#movieTable").tablesorter(); 
});

