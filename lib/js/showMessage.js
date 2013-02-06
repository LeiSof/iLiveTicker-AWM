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
var meldungID = $_GET['meldungID'];
var url = "http://www.ecp-liveticker.de/action/getTickerAction.php?meldungID=" + meldungID;
console.log(url);

function getMessage() {

	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {
			// Ausgabe zusammenbauen
			var html = "";
			if (data[0].spieler_img != 0) {
				html += '<div class="ui-grid-a" >';
				html += '<div class="ui-block-a" align="center">';
				html += data[0].body;
				html += '</div>';
				html += '<div class="ui-block-b" align="center">';
				html += '<img height=100px src="' + data[0].spieler_img + '">';
				html += '</div>';
				html += '</div>';
			} else {
				html = '<div align=center>' + data[0].body + '</div>';
			}
			$('#output').html(html);

		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				$("#anzeigenTafel").hide();
				alert("Fehler beim Laden der Meldung! Abbruch!");
				window.location.href = "index.html";
			}
		}
	});
}