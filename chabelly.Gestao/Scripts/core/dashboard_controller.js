var Request;
var hasError = false;
var dataSet = [
    ["Tiger Nixon", "System Architect", "Edinburgh"],
    ["Garrett Winters", "Accountant", "Tokyo"]
]
var Dashboard = class
{
    constructor() {
        this.Panels = new Array();
        this.init();
    }

    init() {
        var _this = this;
        $(".dashboard_filter").on("click", function (e) {
            $(".dashboard_filter").closest("li").removeClass("active");
            $(this).closest("li").addClass("active");
            var btn = this;
            _this.Panels.forEach(function (item) {
                item.setFilter(btn.id, $("#data_ini_filter_db").val(), $("#data_fin_filter_db").val());
                item.create();
            });
        });
    }

    create(chartType, target, panelType) {
        this.Panels.push(new DashboardPanel(chartType, target, panelType));
    }

    panels(index) {
        return this.Panels[index];
    }

}
var DashboardPanel = class DashboardPanel
{
    constructor(chartType, target, panelType) {
        this.ChartType = chartType;
        this.Target = target;
        this.Filter = { Filter: "", DataIni: "", DAtaFin: "" };
        this.PanelType = panelType;
        this.Data = null;
        this.TableColumns = new Array();
        this.DataTable = null;
    }

    addColumn(columnName) {
        this.TableColumns.push({ "title": columnName, "align" : "center" });
    }

    createTable() {
        var _this = this;
        var _data = new Array();
        this.Data.forEach(function (item) {
            if (_this.PanelType == "Campanha")
                _data.push([item.descricao, item.quantidade, item.valor]);
            else
                _data.push([item.descricao, item.valor]);
        });
        if (this.DataTable != null)
            this.DataTable.destroy();
        this.DataTable = $("#" + this.Target).DataTable({
            data: _data,
            "searching": false,
            "lengthChange": false,
            "info": false,
            "scrollX": false,
            "scrollY": true,
            "paging" : false,
            columns: this.TableColumns,
            language: {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar ",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                }
            }
        });
    }   

    setFilter(filter, data_ini, data_fin)
    {
        if (filter == "Periodo" && (data_ini == "" & data_fin == "")) {
            if (hasError)
                return;
            toastr.warning("Por favor, informe o período inicial e final");
            hasError = true;
            return;
        }
        this.Filter = { Filter: filter, DataIni: data_ini, DataFin: data_fin };
        var filterName = $("#" + filter + ".dashboard_filter")[0].innerText;
        if ($("#" + filter + ".dashboard_filter")[0].tagName == 'BUTTON')
            filterName = "Período";
        $(".dashboard_filter_selected").html(filterName);
    }

    create() {
        if (hasError)
            return;
        var _this = this;
        Request = $.ajax({
            type: 'GET',
            url: "/Dashboard/GetData/",
            async: true,
            cache: false,
            data: {
                tipo: _this.PanelType,
                filter: _this.Filter.Filter,
                data_ini: _this.Filter.DataIni,
                data_fin: _this.Filter.DataFin
            },
            beforeSend: function () {
                App.blockUI({ target: "#" + _this.Target, overlayColor: "none", animate: !0 })
            },
            complete: function () {
                App.unblockUI();
            },
            success: function (data) {
                if (data.success) {
                    hasError = false;
                    _this.Data = JSON.parse(data.data);
                    _this.Chart = new Chart(_this.Target, _this);
                    if (_this.ChartType == 'chart') {
                        _this.Chart.createChart();
                    } else {
                        _this.createTable();
                    }
                } else {
                    toastr.warning(data.message);
                    hasError = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                App.unblockUI();
                if (textStatus == "abort" || errorThrown == "abort") {
                    toastr.warning("Operação cancelada pelo usuário");
                    return;
                }
                toastr.error(errorThrown.message == undefined ? (errorThrown == undefined ? "Ocorreu um erro interno. Por favor efetue novamente o login no sistema" : errorThrown) : errorThrown.message);
            }
        });
    }
}



var Chart = class Chart 
{
    constructor(container, controller) {
        this.Container = container;
        this.Chart = null;
        this.Controller = controller;
    }

    createChart() {
        var _this = this;
        google.charts.load('visualization', '1.1', { packages: ['line', 'corechart'] });
        google.charts.setOnLoadCallback(function () {
            _this.drawChart(_this);
        });
    }

    getContainer() {
        return this.Container;
    }
    
    drawChart(_this) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'data');
        data.addColumn('number', 'ativo');
        data.addColumn('number', 'receptivo');

        //if (_this.Controller.Data.length == 0) {
        //    data.addRow(['', 0, 0]);
        //} else {
            _this.Controller.Data.forEach(function (item) {
                data.addRow([item.data, item.ativo, item.receptivo]);
            });
        //}

        var options = {
            legend: { position: 'top', alignment: 'center' },
            colors: [ '#6f9654' , '#f1ca3a' ],
            chartArea: {
                width: "80%",
                height: "80%"
            },
            height: 400
        };

        _this.Chart = new google.visualization.LineChart(document.getElementById(_this.Container));
        _this.Chart.draw(data, options);

        //if (document.addEventListener) {
        //    window.addEventListener('resize', _this.resizeChart);
        //}
        //else if (document.attachEvent) {
        //    window.attachEvent('onresize', _this.resizeChart);
        //}
        //else {
        //    window.resize = _this.resizeChart;
        //}
    }
}