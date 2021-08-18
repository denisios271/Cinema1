var InformationAlert = (function(){
    var self = {};

    self.show = function(title, text, timeout, delaytime){
        timeout = timeout || 0;
        delaytime = delaytime || 0;
        var dom = $("#info_modal");
        $(".modal-header .modal-title", dom).html(title);
        $(".modal-body", dom).html(text);
        if (title == '')
            $(".modal-header", dom).hide();
        else
            $(".modal-header", dom).show();
        if (timeout > 0)
            setTimeout(function(){
                dom.modal("show");
                setTimeout(function(){
                    dom.modal("hide");
                }, timeout);
            }, delaytime);
        else
            dom.modal("show");
    }

    self.success = function(text, timeout, delaytime){
        self.show("Success <span class = 'glyphicon glyphicon-ok' style = 'color: green'></span>", "<div class = 'alert alert-success'>" + text + "</div>", timeout, delaytime);
    }

    self.error = function(text, timeout, delaytime){
        self.show("Error <span class = 'glyphicon glyphicon-remove' style = 'color: red'></span>", "<div class = 'alert alert-danger'>" + text + "</div>", timeout, delaytime);
    }

    return self;
})();