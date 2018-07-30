var _base;
var _root;

var LayoutClass = function (root) {
    _root = root;
    this.init();
}

LayoutClass.prototype =
{    
    init: function () {
        //require.config({
        //    paths: {
        //        layout: "layout_class",
        //        base: "base_class",
        //        exception: "exception_class",
        //        core: "core_class",
        //    }
        //});
        _base = new Base(_root);
    },
    getBase: function(){
        return _base;
    },
    message: function(message, css)
    {
        if (message == undefined || message == "")
            return;
        switch (css)
        {
            case "success":
                toastr.success(message);
                break;
            case "danger":
                toastr.error(message);
                break;
            case "warning":
                toastr.warning(message);
                break;
            default:
                toastr.info(message);
                break;
        }
    }

}