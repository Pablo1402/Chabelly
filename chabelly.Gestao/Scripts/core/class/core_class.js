var Controller;
var _base;

var Core = function (controller) {
    Controller = controller;
    this.init();
}

Core.prototype =
{
    init: function () {
        this.checkbox.checkStatus();
        inialize();
    },
    setBase: function(base)
    {
        _base = base;
    },
    generate: function () {

        //BootstrapSwitch
        configureBootstrapSwitch();
        configureCheckbox();
        configureDropdown();
        configureAutocomplete();
        configureInput();
    },
    configureBootstrapSwitch: function(){
    },
    configureCheckbox: function(){
    },
    configureDropdown: function(){
        configureDropdown();
    },
    configureAutocomplete: function(){
        configureAutocomplete();
    },
    configureInput: function(){
        configureInput();
    },
    checkbox: 
    {
        checkStatus: function ()
        {
            checkStatus();
        },
        setValue: function(obj){
            var elementType = $(this).prev().prop('nodeName');            
        }
    },
    getSelectedValues: function () {
        return getSelectedValues();
    },
    clearSelectedValues: function () {
        this.getSelectedValues() = [];
    },
    removeSelectedValue: function (value) {
        var index = getSelectedValues().indexOf(parseInt(value));
        if (index > -1) {
            getSelectedValues().splice(index, 1);
        }
    }
}

function inialize() {
    $('.core_input_next').focus(
   function () {
       $(this).css({ 'background-color': '#fffeee' });
       $(this).blur(function () {
           $(this).css({ 'background-color': '#fff' });
       });
   });

    $(document).on("click", ".core_alert_modal", function (e) {
        var text = this.dataset.text;
        var title = this.dataset.title;
        if (text != "")
            bootbox.alert(
                {
                    title: title != undefined ? title : "Informações Adicionais",
                    message: text,
                    onEscape: true,
                    backdrop: true,
                    buttons: {
                        ok: {
                            label: 'Fechar'
                        }
                    }
                });
    });
    $('.calendario').setMask({ mask: '99/99/9999', autoTab: false });
    $('.campoCNPJ').setMask({ mask: '99.999.999/9999-99', autoTab: false });
    $('.campoCPF').setMask({ mask: '999.999.999-99', autoTab: false });
    $(".numeric").setMask({ mask: '9999999999', autoTab: false });
    $(".campoTEL").setMask({ mask: '(99)999999999', autoTab: false });
    $(".campoCEP").setMask({ mask: '99.999-999', autoTab: false });
    $("input.decimal").setMask('decimal');

    if ($.browser.msie && $.browser.version.substr(0, 1) == 6) { $('html').addClass('ie6'); }
    if ($.browser.msie && $.browser.version.substr(0, 1) == 7) { $('html').addClass('ie7'); }
    if ($.browser.msie && $.browser.version.substr(0, 1) == 8) { $('html').addClass('ie8'); }
    if ($.browser.msie && $.browser.version.substr(0, 1) == 9) { $('html').addClass('ie9'); }
}

function getController(_controller){
    return Base.Root() + _controller + "/";
}

/* CONFIRURAÇÔES DEFAULT DE COMPONENTES */

//BootstrapSwitch

function configureBootstrapSwitch()
{
    $.fn.bootstrapSwitch.defaults.size = 'mini';
    $.fn.bootstrapSwitch.defaults.onText = 'Sim';
    $.fn.bootstrapSwitch.defaults.offText = 'Não';

    $(".core_input_switch").bootstrapSwitch();

    $(".core_input_switch").on('switchChange.bootstrapSwitch', function (event, state) {
        if ($(this).hasClass("core_input_edit")) {
            setAtivo(this.dataset.targetid, state, this);
        };            
    });
}

//CheckBox

function setAtivo(id, ativo, obj) {
    _base.ajax(getController(Controller) + "ActiveRow/",
        {
            id: id,
            ativo: ativo
        }, "POST",
        handle_success = function (r) {
            if (r.success) {
                toastr.success(r.message);
                update(obj, r.data);
                checkStatus();
            } else {
                toastr.error(r.message);
            }
        });
}

function configureCheckbox()
{
    if ($("#Ativo") == undefined)
    {
        $("form").append("<input type='hidden' id='Ativo' />");
    }
    $(".core_input_edit").on('click', function (event) {
        setAtivo(this.dataset.targetid, this.dataset.value, this);
    });
}

function checkStatus()
{
    if ($("#Ativo").val() != undefined)
    {
        var _ativo = $("#Ativo").val().toLowerCase() == "true";
        $(".core_disable_if_inactive").each(function (index, obj)
        {
            switch (obj.nodeName) {
                case "INPUT":
                    $(obj).attr("readonly", !_ativo);
                    break;
                case "A":
                    _ativo ? $(obj).show() : $(obj).hide();
                    break;
                case "SELECT":
                    if (!_ativo)
                        $(obj).attr("disabled", "disabled");
                    else
                        $(obj).removeAttr("disabled");
                    break;
            }
        });
    }
}


function update(obj, data) {
    if (obj.type == "checkbox") { // IS CHECKBOX OR SWITCH
        if (data.ativo != undefined) {
            obj.checked = data.ativo;
            if ($(this).hasClass("core_input_switch"))
                $(this).bootstrapSwitch('state', data.ativo, true);
        }
    } else if (obj.type == "" && obj.nodeName == "A") { // IS BUTTON
        if (data.ativo == false)
            $(obj).removeClass(obj.dataset.cssfalse).addClass(obj.dataset.csstrue);
        else if (data.ativo == true)
            $(obj).removeClass(obj.dataset.csstrue).addClass(obj.dataset.cssfalse);
        obj.innerText = obj.innerText.replace(data.ativo == false ? "Desativar" : "Ativar", data.ativo == true ? "Desativar" : "Ativar");
        obj.dataset.value = !data.ativo;
    }
    $("#Ativo").val(data.ativo);
}

//DropDown
function configureDropdown() {
    $(".core_dropdown").each(function (index, obj) {
        var obj = this;
        var _controller = obj.dataset.controller;
        var _method = obj.dataset.method;
        var _parameters = obj.dataset.parameters;
        var _targetid = obj.dataset.targetid;
        var _value = obj.dataset.value;
        var _onlyActive = obj.dataset.onlyactive;
        var url = getController(_controller) + (_method == undefined ? "GetAll" : _method) + (_parameters == undefined ? "" : "?" + _parameters);
        _base.ajax(url, { onlyActive: _onlyActive }, "GET", function (result) {
            $.each(result.data, function () {
                $(obj).append($('<option>', {
                    value: this.id,
                    text: this.descricao,
                    selected: _value == this.id
                }));
            });
        });
        $("#" + obj.id).change(function (e) {
            if (_targetid != undefined)
                $("#" + _targetid).val(this.value);
        });
    });
}

//Autocomplete
var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

var selectedvalues = new Array();

function getSelectedValues() {
    return selectedvalues;
}

function configureAutocomplete()
{
    selectedvalues = new Array();
    $(".core_autocomplete").die();
    $(".core_autocomplete").typeahead("destroy");
    $(".core_autocomplete").each(function (index, obj) {
        if (!$(obj).hasClass("typeahead"))
            $(obj).addClass("typeahead");
        var _controller = obj.dataset.controller;
        var _onlyActive = obj.dataset.onlyactive;
        var _target = obj.dataset.target;
        var _redirectactionbyid = obj.dataset.redirect_action_by_id;
        var _action = obj.dataset.action == undefined ? "GetAll" : obj.dataset.action;
        var url = getController(_controller) + _action + "/?onlyActive=" + _onlyActive;
        // This is going to make an HTTP post request to the controller
        //_base.ajax(url, { onlyActive: _onlyActive }, "POST", function (result) {
            var data = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: url
            });
            $(obj).typeahead(
                {
                    hint: true,
                    highlight: true,
                    minLength: 0,
                    autocomplete: true,
                },
                {
                    name: obj.id,
                source: data
                }).bind('typeahead:selected', function (o, datum) {
                    $("#" + _target).val(parseInt(datum.split("-")[0]));
                    if (_redirectactionbyid != undefined)
                        location.href = _redirectactionbyid + "?id=" + parseInt(datum.split("-")[0]);
                }).bind('typeahead:autocompleted', function (o, datum) {
                    $("#" + _target).val(parseInt(datum.split("-")[0]));
                });;
        //})
    });
    $(".core_autocomplete_ajax").die();
    $(".core_autocomplete_ajax").typeahead("destroy");
    $(".core_autocomplete_ajax").each(function (index, obj) {
        if (!$(obj).hasClass("typeahead"))
            $(obj).addClass("typeahead");
        var allowrepeat = obj.dataset.allowrepeat == "true";
        var target = obj.dataset.target == null ? $(obj).selector : obj.dataset.target;
        var target_template = obj.dataset.template;
        var method = obj.dataset.method;
        var parameters = obj.dataset.parameters != undefined ? obj.dataset.parameters : "";
        var incremental = obj.dataset.targettype == "incremental";
        var id = obj.dataset.targetid;
        var url = "/AutoComplete/" + method + "/?query=%QUERY" + parameters;
        obj.placeholder = "Comece a digitar parte do texto ...";
        var data = new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: url,
                cache: false,
                ajax: {
                    beforeSend: function(EV, settings){
                        return $(obj).val() != "";
                    }
                },
                filter: function (data) {
                    return $.map(data.data, function (v) {
                        return {
                            id: v.Id,
                            value: v.Value
                        };
                    });
                }
            }
        });

        // Initialize the Bloodhound suggestion engine
        data.initialize();

        function processSelected(datum)
        {
            var retorno = 1;
            if (!allowrepeat) {
                var exists = $.grep(selectedvalues, function (e) {
                    return e == datum.id;
                });
                if (exists.length > 0) {
                    toastr.warning("Opção já selecionada");
                    $(obj).val("");
                    $(obj).focus();
                    retorno = 0;
                }
            }
            if (retorno) {
                $("#" + target).show();
                var input;
                if (target_template != undefined)
                    input = target_template.replace('%id', datum.id).replace('%value', datum.value);
                else
                    input = datum.id;
                if (incremental) {
                    $("#" + target).append(input);
                    selectedvalues.push(datum.id);
                } else {
                    if (target_template != undefined)
                        $("#" + target).html(input);
                    else
                        $("#" + target).val(datum.id);
                    selectedvalues[0] = datum.id;
                }
                $(obj).focus();
            }
            $(obj).trigger("complete", retorno);
            return retorno;
        }

        // Instantiate the Typeahead UI
        $(obj).typeahead(
        {
            hint: true,
            highlight: true,
            minLength: 2,
            autocomplete: true,
        },
        {
        displayKey: 'value',
        source: data.ttAdapter()
        }).bind('typeahead:selected', function (o, datum) {
            processSelected(datum);
        }).bind('typeahead:autocompleted', function (o, datum) {
            processSelected(datum);
        });
    });
}

//INPUT
function next(obj)
{
    // Get all focusable elements on the page
    var $canfocus = $(':focusable');
    var index = $canfocus.index(obj) + 1;
    if (index >= $canfocus.length) index = 0;
    $canfocus.eq(index).focus();
}

function configureInput() {
    $.extend(jQuery.expr[':'], {
        focusable: function (el, index, selector) {
            return $(el).is('a, button, :input, [tabindex]');
        }
    });

    $(document).on('keypress', '.core_input_next', function (e) {
        if (e.which == 13 || $(this).val().length == $(this).attr("maxlength")) {
            e.preventDefault();
            next(this);
        }
    });

    $(document).on('change', 'SELECT.core_input_next', function (e) {
        next(this);
    })
}