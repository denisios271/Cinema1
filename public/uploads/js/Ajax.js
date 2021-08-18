var AJAX = (function(){
    var self = {};

    self.send = function(__DATA, successCallBack, errorCallBack){
        $.ajax({
            url: "/toplist/api.php",
            method: "post",
            data: __DATA,
            dataType: "json",
            success: function(data){
                successCallBack(data);
            },
            error: function(e){
                console.error(e);
                errorCallBack(e);
            }
        });
    }

    return self;
})();