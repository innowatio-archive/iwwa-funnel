var baucis = require("baucis");

// Decorator middleware
baucis.Controller.decorators(function () {
    var controller = this;
    controller.request("post", function (request, response, next) {
        request.baucis.incoming(function (context, callback) {
            // Decorating record
            context.incoming.DataCreazione = new Date();
            callback(null, context);
        });
        next();
    });
});
