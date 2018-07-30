var loading = new Loading();

var CampanhaPublicoPainel = class CampanhaPublicoPainel {
    constructor(campanha_publico, sigla) {
        this.init(campanha_publico, sigla);
    };

    static loadOperadoresCampanha(obj, target) {
        this.request = $.ajax({
            type: 'GET',
            url: "/CampanhaOperador/GetOperadoresByIdCampanha/",
            cache: false,
            data: {
                id: obj.id
            },
            beforeSend: function () {
                loading.show();
            },
            complete: function () {
                loading.hide();
            },
            success: function (data) {
                var html = "";
                if (data.success) {
                    if (data.data.length > 0) {
                        html += '<div class="btn-group-vertical margin-right-10">';
                        $.each(data.data, function (index, o) {
                            html += '<button type="button" class="btn btn-info" id="' + o.id + '"> Adicionar ' + o.name + '</button>';
                        });
                    }
                }
                if (html == "")
                    html = "<h3>Nenhum registro encotrado</h3>";

                $("#" + target).html(html);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                loading.hide();
                if (textStatus == "abort" || errorThrown == "abort") {
                    toastr.warning("Operação cancelada pelo usuário");
                    return;
                }
                toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
            }
        });
    }

    init(campanha_publico, sigla) {
        var _this = this;
        var campanha_publico = campanha_publico;
        this.campanha_publico = campanha_publico;
        this.sigla = sigla;       
    };
    static load(id, sigla, target, core) {
        $.ajax({
            type: 'GET',
            url: "/CampanhaPublico/GetPainel/",
            async: true,
            cache: false,
            data: {
                id: id,
                painel: sigla
            },
            beforeSend: function () {
                loading.show();
            },
            complete: function () {
                loading.hide();
            },
            success: function (data) {
                    $(target.selector).html(data);
                switch (sigla)
                {
                    case "oppn":
                        core.configureDropdown();
                        break;
                    case "padt":
                        core.configureAutocomplete();
                        break
                }                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                loading.hide();
                if (textStatus == "abort" || errorThrown == "abort") {
                    toastr.warning("Operação cancelada pelo usuário");
                    return;
                }
                toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
            }
        });
    }
    load() {
        var _this = this;
        this.campanha_publico.container.html(CampanhaPublicoPainel.load(_this.campanha_publico.campanha_id, _this.sigla, ($(_this.campanha_publico).container_details != undefined ? _this.campanha_publico.container_details :_this.campanha_publico.container)));
    };
}

var CampanhaPublicoController = class CampanhaPublicoController {

    constructor(campanha_id, core) {
        this.init(campanha_id);
        this.Core = core;
    };

    init(campanha_id) {
        this.campanhaId = campanha_id;
        this.Panel = campanha_id;
        CampanhaPublicoBase
        this.CampanhaPublicoItems = new Array();
        this.createEvents();
    };

    createEvents() {
        var _this = this;

        $(".tabCampanhaPublico").die().on("click", function (e) {
            var _id = this.id;
            var _sigla = this.dataset.panel;
            CampanhaPublicoPainel.load(_id, _sigla, _this.getItemBySigla(_sigla).container, _this.Core);            
        });

    }

    getItemBySigla(sigla)
    {
        var r;
        for(var i = 0; i <= this.CampanhaPublicoItems.length - 1; i++)
        {
            if (this.CampanhaPublicoItems[i].Panel.sigla == sigla)
                return this.CampanhaPublicoItems[i];
        }
        return r;
    }
   
    setconfigPublico(container, container_details)
    {
        this.CampanhaPublicoItems[0] = new CampanhaPublicoPublico(this.campanhaId, container, container_details, this)
    }

    setconfigOperadores(container, container_details) {
        this.CampanhaPublicoItems[1] = new CampanhaPublicoOperadores(this.campanhaId, container, container_details, this)
    }

    setconfigOrdenacao(container, container_details) {
        this.CampanhaPublicoItems[2] = new CampanhaPublicoOrdenacao(this.campanhaId, container, container_details, this)
    }

    setconfigResumo(container, container_details) {
        this.CampanhaPublicoItems[3] = new CampanhaPublicoResumo(this.campanhaId, container, container_details, this)
    }
};

class CampanhaPublicoBase {
    constructor(campanha_id, container, container_details, panelSigla, controller)
    {
        this.init(campanha_id, container, container_details, panelSigla, controller);
    }

    init(campanha_id, container, container_details, panelSigla, controller) {
        this.campanha_id = campanha_id;
        this.controller = controller;
        this.container = container != undefined ? $("#" + container) : null;
        this.container_details = container_details != undefined ? $("#" + container_details) : null;
        this.Panel = new CampanhaPublicoPainel(this, panelSigla);
        this.createEvents();
    }

    instance() {
        return this;
    };

    getCampanhaId() {
        return this.campanha_id;
    }

    createEvents() {
    }

    save() {

    }
}

var CampanhaPublicoPublico = class CampanhaPublicoPublico extends CampanhaPublicoBase
{
    constructor(campanha_id, container, container_details, controller) {
        super(campanha_id, container, container_details, "papn", controller);
        this.CampanhaTipoConfig = 0;
        this.PermiteLista = false;
    }

    createEvents() {
        super.createEvents();
        var _this = this;
        $(".opt_cam_tip_conf").die();
        $(document).on("click", ".opt_cam_tip_conf", function (e) {
            e.preventDefault();
            _this.CampanhaTipoConfig = this.id;
            _this.PermiteLista = this.dataset.isList;
            var content = CampanhaPublicoPainel.load(this.id, "padt", _this.container_details, _this.controller.Core);
            $(".opt_cam_tip_conf li").removeClass("todo-active");
            $(this).find("li").addClass("todo-active");
            _this.createEventsDetails();
            _this.controller.Core.configureAutocomplete();
            if ($("#valor_parametro").hasClass("decimal") || $("#valor_parametro").hasClass("numero"))
            {
                $("#valor_parametro").attr("width", "200px");
            }
        });

        $("#btnCondicoesAdicionadas").die();
        $(document).on("click", "#btnCondicoesAdicionadas", function (e) {
            e.preventDefault();
            var obj = this;
            var _campanha_id = _this.campanha_id;
            if (_campanha_id > 0) {
                $("#container_resumo_condicao").load("/CampanhaPublico/GetCondicoes/?campanha_id=" + _campanha_id, function () {
                    $("#modal_resumo_condicao").modal("show");
                });
            } else {
                toastr.warning("Campanha ou configuração não encontrada. Por favor, atualize sua página no navegador");
            }
        });

        $(".remove_condicao").die();
        $(document).on("click", ".remove_condicao", function (e) {
            e.preventDefault();
            var _id = this.id;
            var tr = $(this).closest("tr");
            this.request = $.ajax({
                type: 'POST',
                url: "/CampanhaPublico/RemoveCondicao/",
                async: false,
                cache: false,
                data: {
                    id: _id,
                },
                beforeSend: function () {
                    loading.show();
                },
                complete: function () {
                    loading.hide();
                },
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        tr.remove();
                    } else {
                        toastr.warning(data.message);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    loading.hide();
                    if (textStatus == "abort" || errorThrown == "abort") {
                        toastr.warning("Operação cancelada pelo usuário");
                        return;
                    }
                    toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
                }
            });
        });
    };

    createEventsDetails() {
        var _this = this;
        $(".remove_value").die();
        $(document).on("click", ".remove_value", function (e) {
            e.preventDefault();
            var span = this.parentElement.closest("span");
            _this.controller.Core.removeSelectedValue(span.id);
            span.remove();
            $("#valor_parametro").val("");
            if ($("#seletected_values > span").length == 0)
                $("#seletected_values").html("<h5>Nenhum Valor Adicionado</h5>");
        });
        
        $("#valor_parametro").die();
        $(document).on("complete", "#valor_parametro", function (result) {
            $(this).val("");
        });
        
        $("#btnAdicionarCondicao").die();
        $(document).on("click", "#btnAdicionarCondicao", function (e) {
            e.preventDefault();
            var obj = this;
            var _campanha_id = _this.campanha_id;
            var _tipo_configuracao_id = _this.CampanhaTipoConfig;
            var _permite_lista = _this.PermiteLista;
            var _condicao_regra_id = $("#condicao_parametro").val();
            var _valor = "";
            var _descricao = "";
            
            if (!$("#valor_parametro").hasClass("core_autocomplete_ajax")) {
                _valor = $("#valor_parametro").val();
                _descricao = $("#valor_parametro").val();
            }
            else {
                var values = new Array();
                var descriptions = new Array();
                $(".core_auto_complete_values").each(function (index, obj) {
                    values.push(obj.id);
                    descriptions.push($.trim(obj.textContent));
                });
                if (values.length > 0) {
                    _valor = "'" + values.join("','") + "'";
                    if (descriptions.length > 0) {
                        _descricao = descriptions.join();
                    }
                }
            }
            this.request = $.ajax({
                type: 'POST',
                url: "/CampanhaPublico/AddCondicao/",
                async: true,
                cache: false,
                data: {
                    campanha_id: _campanha_id,
                    tipo_configuracao_id: _tipo_configuracao_id,
                    condicao_regra_id: _condicao_regra_id,
                    valor: _valor,
                    descricao: _descricao
                },
                beforeSend: function () {
                    loading.show();
                },
                complete: function () {
                    loading.hide();
                },
                success: function (data) {
                    if (data.success) {
                        if (data.data == "a") {
                            toastr.success(data.message);
                        } else {
                            toastr.info(data.message);
                        }
                        $("#valor_parametro").val("");
                        $("#seletected_values").html("<h5>Nenhum Valor Adicionado</h5>");
                    } else {
                        toastr.warning(data.message);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    loading.hide();
                    if (textStatus == "abort" || errorThrown == "abort") {
                        toastr.warning("Operação cancelada pelo usuário");
                        return;
                    }
                    toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
                }
            });            
        });
    }
}

var CampanhaPublicoOperadores = class CampanhaPublicoOperadores extends CampanhaPublicoBase {
    constructor(campanha_id, container, container_details, controller) {
        super(campanha_id, container, container_details, "oppn", controller);
        this.EquipeId = 0;
        this.Target = "";
        this.Select = "IdEquipeOperador";
    }

    createEvents() {
        var _this = this;
        $(document).on("change", "#IdEquipeOperador", function (e) {
            this.Select = this;
            _this.EquipeId = this.value;
            _this.Target = this.dataset.target;
            if (this.selectedIndex > 0)
                _this.loadEquipe();
        });
        $(document).on("click", ".remove_operador", function (e) {
            var _obj = this;
            this.request = $.ajax({
                type: 'POST',
                url: "/CampanhaPublico/RemoveOperador/",
                data: {
                    campanha_id: _this.campanha_id,
                    operador_id: _obj.id
                },
                beforeSend: function () {
                    loading.show();
                },
                complete: function () {
                    loading.hide();
                },
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        if (_obj.id == "")
                        {
                            loading.show();
                            CampanhaPublicoPainel.load(_this.campanha_id, "oppn", _this.container, _this.controller.Core);
                            _this.controller.Core.configureDropdown();
                            _this.loadEquipe();
                            loading.hide();
                        } else {
                            var ul = $(_obj).closest("ul");
                            _obj.closest("li").remove();
                            if (ul.eq(0).find("> li").length == 1)
                            {
                                ul.eq(0).html("<li><h5>Nenhum operador cadastrado para esta campanha</h5></li>");
                            }
                            if ($("#IdEquipeOperador").value != undefined && $("#IdEquipeOperador").value != "") {
                                $("#listOpEquip").append('<li class="list-group-item"><a href="javascript:;" class="adiciona_operador" id="' + _obj.id + '">' + _obj.innerText.replace("remover", "Adicionar") + '</a></li>');
                            }
                        }
                        //CampanhaPublicoPainel.load(_this.campanha_id, "oppn", _this.container);
                        //_this.controller.Core.generate();
                        //_this.loadEquipe();
                    } else {
                        toastr.warning(data.message);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    loading.hide();
                    if (textStatus == "abort" || errorThrown == "abort") {
                        toastr.warning("Operação cancelada pelo usuário");
                        return;
                    }
                    toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
                }
            });
        });
        $(document).on("click", ".adiciona_operador", function (e) {
            var _obj = this;
            this.request = $.ajax({
                type: 'POST',
                url: "/CampanhaPublico/AdicionaOperador/",
                data: {
                    campanha_id: _this.campanha_id,
                    operador_id: _obj.id,
                    equipe_id: _obj.dataset.targetid

                },
                beforeSend: function () {
                    loading.show();
                },
                complete: function () {
                    loading.hide();
                },
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        if (_obj.id == "") {
                            $("#listaOpCamp").html("Carregando  ...");
                            CampanhaPublicoPainel.load(_this.campanha_id, "oppn", _this.container, _this.controller.Core);
                            _this.controller.Core.configureDropdown();
                            _this.loadEquipe();
                        } else {
                            var ul = $(_obj).closest("ul");
                            _obj.closest("li").remove();
                            if (ul.eq(0).find("> li").length == 1) {
                                ul.eq(0).html("<li>Nenhum Operador encontrado</li>");
                            }                            
                            
                            if ($("#listaOpCamp > li").length == 1)
                            {
                                $("#listaOpCamp > li").first().remove();
                                 $("#listaOpCamp").append('<li class="list-group-item bg-blue"><a class="bg-font-blue remove_operador" href="javascript:;" id="" alt="">Remover TODOS</a></li>');
                            }
                            $("#listaOpCamp > li").first().after('<li class="list-group-item "><a href="javascript:;" class="remove_operador" id="' + _obj.id + '">' + _obj.innerText.replace("Adicionar", "Remover") + '</a><span class="badge badge-warning">adicionado</span></li>');
                        }
                    } else {
                        toastr.warning(data.message);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    loading.hide();
                    if (textStatus == "abort" || errorThrown == "abort") {
                        toastr.warning("Operação cancelada pelo usuário");
                        return;
                    }
                    toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
                }
            });
        });
    };

    loadEquipe() {
        $("#" + this.Target).html("<h5>Nenhum registro encontrado</h5>");
        if (!(this.EquipeId > 0 & this.campanha_id > 0))
            return;
        var _this = this;
        this.request = $.ajax({
            type: 'GET',
            url: "/Operador/GetAllByEquipe/",
            cache: false,
            data: {
                id_equipe: this.EquipeId,
                id_campanha: this.campanha_id,
            },
            beforeSend: function () {
                loading.show();
            },
            complete: function () {
                loading.hide();
            },
            success: function (data) {
                if (data.success) {
                    var html = "";
                    if (data.data != undefined && data.data.length > 0) {

                        html += '<p><div><ul class="list-group" id="listOpEquip">';
                        html += '<li class="list-group-item bg-blue"><a class="bg-font-blue adiciona_operador"  id="" href="javascript:;" data-targetid="' + _this.EquipeId + '" alt="">Adicionar TODOS</a></li>';
                        for (var i = 0; i <= data.data.length - 1; i++) {
                            var o = data.data[i];
                            html += '<li class="list-group-item"><a href="javascript:;" data-name="' + o.name + '"  class="adiciona_operador" id="' + o.id + '"> Adicionar ' + o.name + '</a></li>';
                        };
                        html += "</ul></div></p>";
                    }
                    if (html != "")
                        $("#" + _this.Target).html(html);
                    if (_this.Select != undefined) {
                        var selectObj = $("#" + _this.Select + " option[value=" + _this.EquipeId + "]").attr("selected", "selected");
                    }
                } else {
                    $("#" + _this.Target).html("<h3>Nenhum registro encontrado</h3>");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                loading.hide();
                if (textStatus == "abort" || errorThrown == "abort") {
                    toastr.warning("Operação cancelada pelo usuário");
                    return;
                }
                toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
            }
        });
    };

    addremoveOperador(ul, id, name, is_add) {        
        
    }
};

var CampanhaPublicoOrdenacao = class CampanhaPublicoOrdenacao extends CampanhaPublicoBase {
    constructor(campanha_id, container, container_details, controller) {
        super(campanha_id, container, container_details, "orpn", controller);
    }

    setOrdenacao(id, desc, handle)
    {
        return $.ajax({
            type: 'POST',
            url: "/CampanhaPublico/EscolheOrdenacao/",
            async: false,
            cache: false,
            data: {
                campanha_id: this.campanha_id,
                id: id,
                desc: desc
            },
            beforeSend: function () {
                loading.show();
            },
            complete: function () {
                loading.hide();
            },
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                } else {
                    toastr.warning(data.message);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                loading.hide();
                if (textStatus == "abort" || errorThrown == "abort") {
                    toastr.warning("Operação cancelada pelo usuário");
                    return;
                }
                toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
            }
        })
    }

    createEvents() {
        var _this = this;
                
        $(document).on('switchChange.bootstrapSwitch', "#ordenar_descendente", function (event, state) {
            _this.setOrdenacao(null, state)
        });
        $(document).on("click", ".seleciona_ordenacao", function (e) {
            var obj = this;
            e.preventDefault();
            var _id = this.id;
            var l = Ladda.create(this);
            l.start();
            _this.setOrdenacao(_id, null).always(function () {
                $(".seleciona_ordenacao").removeClass("active");
                $(obj).addClass("active");
                Ladda.stopAll();
            });
        });
    };
}

var CampanhaPublicoResumo = class CampanhaPublicoResumo extends CampanhaPublicoBase {
    constructor(campanha_id, container, container_details, controller) {
        super(campanha_id, container, container_details, "repn", controller);
        this.idsExclude = new Array();
    }

    getPublico(cnpj, razao_social, current_page, page_size, handle)
    {
        jQuery.ajaxSettings.traditional = true;
        var _this = this;
        this.request = $.ajax({
            type: 'GET',
            url: "/CampanhaPublico/ProcessarPublico/",
            cache: false,
            data: {
                id: this.campanha_id,
                idsExcludes: _this.idsExclude,
                cnpj: cnpj,
                razao_social: razao_social,
                currentPage: current_page,
                pageSize: page_size                 
            },
            beforeSend: function () {
                $("#modal_publico_selecionado_container").block({ message: "Carregando dados ..." });
            },
            complete: function () {
                $("#modal_publico_selecionado_container").unblock();
            },
            success: function (data) {
                if (data != null) {
                    if (handle == null || handle == undefined) {

                        $("#modal_publico_selecionado_container").html(data);
                        if ($("#total_publico_selecionado").val().toLowerCase() == "false")
                            $("#btnGerarPublico").removeAttr("disabled");
                        else
                            $("#btnGerarPublico").attr("disabled", "disabled");
                        $("#modal_publico_selecionado").modal("show");
                    } else handle(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                loading.hide();
                if (textStatus == "abort" || errorThrown == "abort") {
                    toastr.warning("Operação cancelada pelo usuário");
                    return;
                }
                toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
            }
        }); 
    }

    createEvents() {
        var _this = this;
        $(document).on("click", "#show_operadores", function (e) {
            e.preventDefault();
            $("#modal_resumo_operador").modal("show");
        });

        $(document).on("click", ".showtab", function (e) {
            e.preventDefault();
            var tabname = this.dataset.target;
            $(".tabCampanhaPublico.oppn").trigger("click");
            $('.nav-tabs a[href="' + tabname + '"]').tab('show');

        })

        $("#btnVisualizarPublico").die();
        $(document).on("click", "#btnVisualizarPublico", function (e) {
            e.preventDefault();
            _this.getPublico();
            
        });

        $("#btnGerarPublico").die();
        $(document).on("click", "#btnGerarPublico", function (e) {
            var idsExcludes = _this.idsExclude;
            var total_clientes = $("#total_publico")[0].dataset.value;
            if (_this.idsExclude.length > 0)
                total_clientes = total_clientes - _this.idsExclude.length;
            jQuery.ajaxSettings.traditional = true;
            swal({
                title: "Confirma este público para esta Campanha? \n" + total_clientes + " cliente(s)" ,
                text: "ATENÇÃO! Esta ação não poderá ser desfeita. Todos clientes ativos na campanha serão removidos",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Sim, fazer isso!",
                cancelButtonText: "Não",
                closeOnConfirm: true
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            this.request = $.ajax({
                                type: 'POST',
                                url: "/CampanhaPublico/SalvarPublicoCampanha/",
                                cache: false,
                                data: {
                                    id: _this.campanha_id,
                                    idsExcludes: idsExcludes
                                },
                                beforeSend: function () {
                                    loading.show();
                                },
                                complete: function () {
                                    loading.hide();
                                },
                                success: function (data) {
                                    if (data != null) {
                                        if (data.success) {
                                            toastr.success(data.message);
                                        } else {
                                            toastr.error(data.message);
                                        }
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    loading.hide();
                                    if (textStatus == "abort" || errorThrown == "abort") {
                                        toastr.warning("Operação cancelada pelo usuário");
                                        return;
                                    }
                                    toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
                                }
                            });
                        }
            });
        });

        $("#PageSize").die();
        $(document).on("change", "#PageSize", function (e) {
            var id = _this.campanha_id;
            var currentPage = $("#CurrentPage").val();
            var pageSize = this.value;
            var cnpj = $("#pesq_pub_cnpj").val();
            var razao_social = $("#pesq_pub_razaosocial").val();

            _this.getPublico(cnpj, razao_social, currentPage, pageSize, 
                function(data){
                    $("#modal_publico_selecionado_container").html(data);
                });
        });

        $(".pesq_pub").die();
        $(document).on("keypress", ".pesq_pub", function (e) {
            if (e.which == 13) {
                e.preventDefault();
                var id = _this.campanha_id;
                var currentPage = $("#CurrentPage").val();
                var pageSize = $("#PageSize").val();
                var cnpj = $("#pesq_pub_cnpj").val();
                var razao_social = $("#pesq_pub_razaosocial").val();

                _this.getPublico(cnpj, razao_social, currentPage, pageSize,
                    function (data) {
                        $("#modal_publico_selecionado_container").html(data)
                    });
            }
        });

        $(".limpa_filtro_pub").die();
        $(document).on("click", ".limpa_filtro_pub", function (e) {
            var input = $(this).closest("div").find("input");
            $(input).val("");
            var currentPage = $("#CurrentPage").val();
            var pageSize = $("#PageSize").val();
            var cnpj = $("#pesq_pub_cnpj").val();
            var razao_social = $("#pesq_pub_razaosocial").val();
            _this.getPublico(cnpj, razao_social, currentPage, pageSize,
                function (data) {
                    $("#modal_publico_selecionado_container").html(data)
                });
        });

        $(".remove_usuario_publico").die();
        $(document).on("click", ".remove_usuario_publico", function (e) {
            var td = $(this).closest("td");
            $(td).html("<span class='text-danger'><i class='fa fa-exclamation'></i> Removido</span>");
            if ($.inArray(this.id, _this.idsExclude) == -1) {
                _this.idsExclude.push(parseInt(this.id));
            }
        })
    };
}

//HELP INFO
var msgs = [
    {
        ref: "i_ordem_descrente",
        message: "Selecione esta opção para que a ordenação seja feita do maior para o menor valor. Exemplo: Nos valores 1,2 e 3 se marcado esta opção seria exibido: 3, 2 e 1. No caso campo texto, quando marcado, Z > A"
    }
]

var HelpInfo = class
{
    static show(ref) {
        var m = $.grep(msgs, function (e) { return e.ref == ref; });
        var text = "";
        if (m.length == 1) {
            text = m[0].message;
        } else {
            text = "Nenhuma ajuda encontrada para este tópico";
        }
        swal({
            title: "Ajuda",
            text: text,
            type: "info",
            showCancelButton: false,
            confirmButtonClass: "btn-info",
            confirmButtonText: "Fechar",
            closeOnConfirm: false
        });
    }
}

$(document).on("click", ".help-info", function (e) {
    e.preventDefault();
    HelpInfo.show(this.id);
});
