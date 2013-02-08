
var url = "http://www.ecp-liveticker.de/action/getSpiele.php";

function getSpiele() {

	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			var html = '';
			html += '<p>';
			jQuery.each(data, function(i) {
				html += '<p><center>';
				html += data[i].datum + ' - ' + data[i].uhrzeit + ' Uhr';
				html += '<br>';
				html += '<strong>' + data[i].spielpaarung + '</strong>';
				html += '</center></p>';
			});
			html += '</p>';

			$('#output').html(html);

		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				$("#anzeigenTafel").hide();
				alert("Keine Spiele geplant!");
				window.location.href = "index.html";
			}
		}
	});
}