/* 
	OpenK Tecnologia
	Uberlandia - MG Av. Monsenhor Eduardo, 963 - Sala 06
	Bom Jesus - CEP 38400-748
	Tel: +55 (34) 3238-2222
	E-mail: comercial@openk.com.br

	Author: Abraao P. M. R. B. Junior - Openk Tecnlogia
	E-mail: abraao.junior@openk.com.br
*/
$(document).ready(function () {
    $('.calendario').setMask({ mask: '99/99/9999', autoTab: false });
    $('.campoCNPJ').setMask({ mask: '99.999.999/9999-99', autoTab: false });
    $('.campoCPF').setMask({ mask: '999.999.999-99', autoTab: false });
    $('.calendario').datepicker({ yearRange: '1930:' + data(), changeMonth: true, changeYear: true, autoTab: false });
    $(".numeric").setMask({ mask: '9999999999', autoTab: false });
    $(".campoTEL").setMask({ mask: '(99)999999999', autoTab: false });
    $(".campoCEP").setMask({ mask: '99.999-999', autoTab: false });
    $("input.decimal").setMask('decimal');

    function data() {
        Hoje = new Date();
        Ano = Hoje.getFullYear();
        return Ano;
    };
    $('.calendario').blur(function () {
        var datevalue = $(this).val().split("/");
        if (datevalue.length == 3) {
            var month = parseInt(datevalue[1]);
            if (month > 12) {
                jAlert('Data inválida.');
                $(this).val("");
                return false;
            }
            if (month == 4 || month == 6 || month == 9 || month == 11) {
                if (parseInt(datevalue[0]) > 30) {
                    jAlert('Data inválida.');
                    $(this).val("");
                    return false;
                }
            }
            else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                if (parseInt(datevalue[0]) > 31) {
                    jAlert('Data inválida.');
                    $(this).val("");
                    return false;
                }
            }
            else if (month == 2) {
                if (parseInt(datevalue[2]) % 4 == 0) {
                    if (parseInt(datevalue[0]) > 29) {
                        jAlert('Data inválida.');
                        $(this).val("");
                        return false;
                    }
                }
                else {
                    if (parseInt(datevalue[0]) > 28) {
                        jAlert('Data inválida.');
                        $(this).val("");
                        return false;
                    }
                }
            }
        }
        return true;
    });
    if ($.browser.msie && $.browser.version.substr(0, 1) == 6) { $('html').addClass('ie6'); }
    if ($.browser.msie && $.browser.version.substr(0, 1) == 7) { $('html').addClass('ie7'); }
    if ($.browser.msie && $.browser.version.substr(0, 1) == 8) { $('html').addClass('ie8'); }
    if ($.browser.msie && $.browser.version.substr(0, 1) == 9) { $('html').addClass('ie9'); }
    function init() {
        $('.container-drop').css({
            width:
				$('.container-drop').parent().outerWidth() - $('.container-drop').parent().children('.sidebar-tabs').outerWidth() - 40
        });
    }
    /*if(so != 'Windows XP'){
		$('.inav li .tip').css({opacity: 0, filter: 'alpha(opacity=0)'});
	} else { $('.inav li .tip').hide(); }*/
    $('.inav li').on('mouseenter', function () {
        //$(this).css({ zIndex: 1000 });
        //$(this).children('.tip').css({ top: 0 });
        //if(so != 'Windows X'){
        //$(this).children('.tip').css({ opacity: 0 });
        //$('.inav li .tip').fadeOut(200);
        //$(this).children('.tip').show().stop().animate({ top: - $('.tip').outerHeight() + 20, opacity: 1 },200);
        //} else {
        //	$('.inav li .tip').hide();
        //	$(this).children('.tip').css({ top: -100 }).show();
        //}
        //$(this).children('.ico').removeClass('active');
    })/*.live('mouseleave', function(){
		$(this).css({ zIndex: 0 });
		if(so != 'Windows XP') $('.inav li .tip').fadeOut(200);
		else $('.inav li .tip').hide();
	})*/;
    $('.inav').each(function () {
        if ($(this).find('ul').lenght == 0 || $(this).find('li').length == 0) {
            $(this).remove();
        }
    });
    $('.inav .ico').on('click', function () {
        $('.inav .ico').removeClass('active');
        $(this).addClass('active');
    });
    $('.tabs li').on('mousedown', function () {
        $('.tabs li').removeClass('active');
        $(this).addClass('active');
    });
    $('.inav').on('mouseenter', function () {
        $('.inav .ico').removeClass('active');
    });
    //$("#nav li").children("ul").hide();
    $("#nav > ul > li");/*.each(function () {
		if ($(this).children('ul').length > 0) {
			$(this).css({ paddingRight: 20 }).children('a:first-child').after('<div class="arrow"></div>');
		}
	}).live('focusin', function () { $(this).addClass('hover') }).live('focusout', function () { $(this).removeClass('hover') });*/
    if ($("#nav li ul li").children("ul").length > 0) {
        $("#nav li ul li ul").parent("li").addClass('child');
    }
    $("#nav li ul").each(function () {
        //$(".categorias li ul li:last-child").children("a").css({borderBottom:"none"});
        $("#nav li ul li:first-child").css({ borderTop: "none" });
    });
    $("#nav li").bind('mouseenter', function () {
        //$(this).addClass("ativo").children("ul").width($(this).outerWidth()).fadeIn(100);
        $(this).addClass("ativo").children("ul").addClass('animate-show');
    }).bind("mouseleave", function () {
        $(this).children("ul").removeClass('animate-show');
        $(this).removeClass("ativo");
    });
    $("#nav > ul > li li").bind("mouseover", function () {
        $(this).children("ul").show();
    });
    $('table tr').on('click', function () {
        $(this).parent().find('tr.active').removeClass('active');
        $(this).addClass('active');
    });
    $.datepicker.setDefaults({
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior'
    });
    $(".list-photos .photo").on('mousedown focus', function () {
        $('.zoomIMG').remove();
        var srcIMG = $(this).attr("rel");
        $("body").append('<div class="zoomIMG"><img alt="" src="' + srcIMG + '" width="200"><a href="#" class="close">X<br>Fechar</a></div>')
        $('.zoomIMG').css({ left: $(this).offset().left + $(this).outerWidth() + 30, top: $(this).offset().top - ($('.zoomIMG').outerHeight() / 2) }).show();
        $(".zoomIMG").draggable({ containment: "#container" });
    });
    $('.zoomIMG .close').on('mousedown focus', function (event) {
        event.preventDefault();
        $('.zoomIMG').remove();
    });
    $('#nav ul').on('mouseenter', function () { $('#nav li.active-item').removeClass('active-item'); });
    $('#nav ul > li').on('click focus', function () {
        $('#nav li.active-item').removeClass('active-item');
        $(this).addClass('active-item');
    });
    // Functions - TABS
    //	$(".container-select").sortable({
    //		connectWith: '.drop-get',
    //		cursorAt: 'left'
    //	});
    //	$(".drop-get").sortable({
    //		connectWith: '.container-select',
    //		cursorAt: 'left'
    //	});
    //	$("#sortable, #sortable1, #sortable2, #sortable3").sortable({
    //		connectWith: ".drop-get"
    //	}).disableSelection();
    //	
    //	$(".portlet").addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
    //		.find(".portlet-header")
    //			.addClass("ui-widget-header ui-corner-all ")
    //			.prepend('<span class="ui-icon ui-icon-plusthick"></span>')
    //			.end()
    //		.find(".portlet-content").toggle();

    //	$(".abasdisponiveis .portlet-header .ui-icon").live('click', function() {
    //		alert($(this).parent().parent().html());
    //		CKEDITOR.replace($($(this).parent().parent().children('.portlet-content').find('textarea')).attr('id'));
    //		$(this).toggleClass("ui-icon-minusthick");
    //		$(this).parent().parent().find(".portlet-content").first().toggleClass('hidden');
    //		$('html, body').animate({
    //			scrollTop: $("#header").offset().top
    //		}, 2000);
    //	});
    if ($('.container-drop').length > 0) {
        $(window).resize(function () {
            init();
        });
        init();
    }

    $("#tabs").tabs();

    $(".autocomplete").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'POST',
                url: "/Ajax/Categoria",
                dataType: "json",
                data: {
                    categoria: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.Nome,
                            value: item.Id + ' - ' + item.Nome
                        }
                    }));
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            //ui.item ? $(this).val(ui.item.label + ui.item.label) : $(this).val("");
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });

    $("#divAssociarProduto").dialog({
        autoOpen: false,
        height: 500,
        width: 850,
        modal: true
    });

    $("#divAssociarSugestao").dialog({
        autoOpen: false,
        height: 500,
        width: 850,
        modal: true
    });

    $("#btnAssociarProduto")
      .button()
      .click(function () {
          $("#divAssociarProduto").dialog("open");
      });

    $("#btnAssociarSugestao")
      .button()
      .click(function () {
          $("#divAssociarSugestao").dialog("open");
    });

    $("#btnAssociarAtributos")
          .button()
          .click(function () {
              $("#divAssociarProduto").dialog("open");
          });

    $("#btnAlterarPreco")
          .button()
          .click(function () {
              $("#divbtnAlterarPreco").dialog("open");
          });
    $("#divbtnAlterarPreco").dialog({
        autoOpen: false,
        height: 200,
        width: 400,
        modal: true
    });

    $("#btnAlterarDescricao")
          .button()
          .click(function () {
              var r = confirm('Deseja realmente');
              if (r == true) {
                  alert('ok');
              } else {
                  alert('vish');
              }
          });

    $("#divReenviarEmail").dialog({
        autoOpen: false,
        height: 160,
        width: 400,
        modal: true
    });

    $("#imgReenviarEmail")
          .button()
          .click(function () {
              $("#divReenviarEmail").dialog("open");
          });

    $("#dialog-SelectTemplate").dialog({
        autoOpen: false,
        height: 160,
        width: 400,
        modal: true
    });

    $("#btnAssociarTemplete")
          .button()
          .click(function () {
              $("#dialog-SelectTemplate").dialog("open");
          });

});


/* 
	Altera entre os modos Listar, Cadastar, Alterar
*/


function getModoTela(queryStringName) {

    var qryString = getParameterByName(queryStringName);

    if (qryString == "")
        return "Listar ";
    else if (qryString == "0")
        return "Cadastrar ";
    else if (qryString > 0)
        return "Alterar ";
    else
        return " ";
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

Globalize.cultureSelector = 'pt-BR';