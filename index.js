var baucis   = require("baucis");
var express  = require("express");
var mongoose = require("mongoose");
require("baucis-swagger2");

var Misura    = require("./models/misura.js");
var Sito      = require("./models/sito.js");
var Variabile = require("./models/variabile.js");

var PORT_NUMBER = 8012;


// Mongoose connection
mongoose.connect("mongodb://localhost:27017/innowatio");

// Register the models
mongoose.model("variabile", Variabile);
mongoose.model("sito", Sito);
mongoose.model("misura", Misura);

// adding middlware decorator
baucis.Controller.decorators(function (options, protect) {
    var controller = this;
    controller.request("post", function (request, response, next) {
        request.baucis.incoming(function (context, callback) {
            // decorating record
            context.incoming.DataCreazione = new Date();
            callback(null, context);
        });

        next();
    });
});

// Create controllers
var variabileCtrl = baucis.rest("variabile");
var sitoCtrl = baucis.rest("sito");
var misuraCtrl = baucis.rest("misura");

// only POST allowed
variabileCtrl.methods("head get put delete", false);
sitoCtrl.methods("head get put delete", false);
misuraCtrl.methods("head get put delete", false);

// Create the app and listen for API requests
var app = express();
app.use("/api", baucis());
app.listen(PORT_NUMBER);

console.log("Server listening on port " + PORT_NUMBER);
