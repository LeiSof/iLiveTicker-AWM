// Reloadwert setzen!
window.setInterval("timer();", 30000);

var para = location.search;
// Variable für Parameter
// Parameter extrahieren
para = para.replace(/^\?/, "").split("&");
$_GET = new Object();
for (var i = 0; i < para.length; i++) {
	var split = para[i].split("=");
	var name = split[0];
	split.splice(0, 1);
	var wert = split.join("=");
	try {
		$_GET[name] = decodeURIComponent(wert);
	} catch(e) {
		alert(wert);
	}
}
var mannschaftID = $_GET['mannschaftID'];
var url1 = "http://www.ecp-liveticker.de/action/getGameData.php?mannschaftID=" + mannschaftID;
var url2 = "http://www.ecp-liveticker.de/action/getTickerAction.php?mannschaftID=" + mannschaftID;

function tickerRefresh() {

	$.ajax({
		url : url2,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {
			// Ausgabe zusammenbauen
			$("#output").text = "";

			// durch jedes Element iterieren
			html = "";
			jQuery.each(data, function(i) {

				html += '<li><a href="showMessage.html?meldungID=' + data[i].id + '&limit=1" data-rel="dialog" data-ajax="false"><img src="http://www.ecp-liveticker.de/thumbs/' + data[i].actionIcon + '_new.png" class="ui-li-icon"><p><b>' + data[i].body + '</b></p><p>'+ data[i].spielAbschnitt +' - Spielstand:'+ data[i].spielStand+ '</p></li>';
			});
			$('#output').empty($(html));
			// DOM - Container leeren
			$('#output').append($(html));
			// Neue Nodes einhängen
			$('#output').trigger('create');
			// Contanier erzeugen
			$('#output').listview('refresh');
			// Container refreshen
			$('#ladeHinweis').hide();
			// Anzeige, dass Ticker geladen wird verbergen.
			//console.log(html);
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				$("#anzeigenTafel").hide();
				alert("Kein aktueller Ticker für diese Mannschaft");
				window.location.href = "index.html";
			}
		}
	});

}

function anzeigentafelRefresh() {
	$.ajax({
		url : url1,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',
		success : function(data) {
			$('#header').html(data['mannschaft']);
			$('#begegnung').html(data['begegnung']);
			$('#heimmannschaft').html(data['heimmannschaft']);
			$('#gastmannschaft').html(data['gastmannschaft']);
			document.getElementById("heimlogo").src = "http://www.ecp-liveticker.de/logos/" + data['heimlogo'] + ".gif";
			document.getElementById("gastlogo").src = "http://www.ecp-liveticker.de/logos/" + data['gastlogo'] + ".gif";
			$('#spielstand').html(data['heimtor'] + " : " + data['gasttor']);
			$('#spieldrittel').html("<i>(" + data['spieldrittel'] + ")</i>");
			$('#teamAnzeige').attr("href", "showTeam.html?mannschaftID=" + mannschaftID);
		}
	});
}

function timer() {
	tickerRefresh();
	anzeigentafelRefresh();
}