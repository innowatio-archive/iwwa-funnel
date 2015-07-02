var baucis   = require("baucis");
var express  = require("express");
var mongoose = require("mongoose");
require("baucis-swagger2");


var PORT_NUMBER = 8012;

// Mongoose connection
mongoose.connect("mongodb://localhost:27017/Innowatio");

// Mongoose models
var Variabile = new mongoose.Schema({
    codice: String,
    descrizione: String,
    um: String,
    frequenza: String,
    tipo: String,
    tipoValore: String,
    cumulata: Boolean
});

var Sito = new mongoose.Schema({
    id: String,
    idParent: String,
    descrizione: String,
    codiceAzienda: String,
    azienda: String
});

var Misura = new mongoose.Schema({
    impianto: String,
    idVariabile: String,
    valore: String,
    // TODO Datetime in mongoose?
    dataLettura: Date,
    // the 2 following dates
    dataInizio: Date,
    dataFine: Date,
    // or just this one
    data: Date
});

// Register the models
mongoose.model("variabile", Variabile);
mongoose.model("sito", Sito);
mongoose.model("misura", Misura);

// Create a simple controller.  By default these HTTP methods
// are activated: HEAD, GET, POST, PUT, DELETE
baucis.rest("variabile");
baucis.rest("sito");
baucis.rest("misura");

// Create the app and listen for API requests
var app = express();
app.use("/api", baucis());
app.listen(PORT_NUMBER);

console.log("Server listening on port " + PORT_NUMBER);
