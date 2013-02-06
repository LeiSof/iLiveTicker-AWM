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
var url = "http://www.ecp-liveticker.de/action/getAufstellung.php?mannschaftID=" + mannschaftID;

function getTeam() {

	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			var html = '';
			html += '<div class="ui-grid-b" align="center">';
			jQuery.each(data, function(i) {
				html += '<div class=\"ui-block-a\">';
				html += '<img src="' + data[i].bildURL + '">';
				html += '</div>';
				html += '<div class="ui-block-b">';
				html += '#' + data[i].nummer + " - " + data[i].name;
				html += '</div>';
			});
			html += '</div>';

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