function getVersion() {
	$.get("http://main.ecp-liveticker.de/awmapp/config.xml", function(configArray) {
		// suche nach dem widget abschnitt
		$(configArray).find("widget").each(function() {
			// gefundenen abschnitt in variable zwischenspeichern
			var widget = $(this);
			// version extrahieren
			var version = widget.attr('version');
			// aktuelle version anzeigen
			$("#akt_version").html(version);
		});
	});
}