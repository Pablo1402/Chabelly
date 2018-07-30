/* 
	OpenK Tecnologia
	Uberlandia - MG Av. Monsenhor Eduardo, 963 - Sala 06
	Bom Jesus - CEP 38400-748
	Tel: +55 (34) 3238-2222
	E-mail: comercial@openk.com.br

	Author: Abraao P. M. R. B. Junior - Openk Tecnlogia
	E-mail: abraao.junior@openk.com.br
*/
$(document).ready(function(){
	function init(){
		$('#txtusuario').live('keydown', function(event) {
			var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
			if (keyCode == 13) {
				event.preventDefault();
				$('#txtsenha').focus();
			}
		});
		$('#txtsenha').live('keydown', function(event) {
			var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
			if (keyCode == 13) {
				event.preventDefault();
				$('input[type="submit"]').addClass('active');
				setTimeout(function() {
					$('input[type="submit"]').trigger('click');
				},500);
			}
		});
	}
	init();
});