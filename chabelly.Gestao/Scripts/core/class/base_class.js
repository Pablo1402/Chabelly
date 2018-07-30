var Loading = function () {
    this.obj = $("#mdlloading");
}
Loading.prototype =
{
    show: function () {
        $.blockUI({
            ignoreIfBlocked: false,
            message: "<img src='../../Images/spinner.gif'/> Processando ...<br/><small>Caso demore muito, atualize sua página no navegador</small>"
        });
    },
    hide: function () {
        $.unblockUI();
    }
}

var Root = "";
var Base = function (root) {
    this.init();
    this.request = null;
    Root = root;
}

Base.prototype =
    {
        init: function(){
        },
        getRoot: function(){
            return Root + "/";
        },
        request: function(){
            return this.request;
        },
        ajax: function (url, data, type, handle_success, handle_error) {
            this.request = $.ajax({
                type: type == undefined ? "POST" : type,
                cache: false,
                url: url,
                dataType: "json",
                data: data,
                success: function(r){
                    handle_success(r);

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var message = thrownError != undefined ? thrownError : "Ops! Algo deu errado. Tente reiniciar a aplicação";
                    toastr.error(message, "Mensagem de erro");
                    if (handle_error != undefined)
                        handle_error(xhr, ajaxOptions, thrownError);
                }
            });
        }
    }

Base.Root = function () {
    return Root + "/";
}

Base.windowOpen = function(url, title, w, h, sFeatures)
{
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, sFeatures + 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    if (window.focus) {
        newWindow.focus();
    }

}

Base.datatable_language = 
    {
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

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}