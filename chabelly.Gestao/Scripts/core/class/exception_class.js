var Exception = function ()
{
}

Exception.prototype = 
{
    save: function (message, trace) {
        $.ajax({
            type: "POST",
            cache: false,
            url: Base.Root() + "Exception/Add",
            dataType: "json",
            data: {
                message: message == undefined ? "NT" : message,
                type: "POST",
                trace: trace
            },
            success: function(r) {            
            },
                error: function (xhr, ajaxOptions, thrownError) {
                    toastr.error("Erro ao gravar log. Erro >> " + thrownError);
                }
            });
    }
}