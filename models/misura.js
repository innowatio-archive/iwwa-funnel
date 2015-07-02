var mongoose = require("mongoose");

var schema = {
    Impianto: String,
    IdVariabile: String,
    Valore: String,
    // TODO Datetime in mongoose?
    DataLettura: Date,
    // the 2 following dates
    DataInizio: Date,
    DataFine: Date,
    // or just this one
    Data: Date,
    DataCreazione: Date
};

var options = {
    strict: "throw"
};

module.exports = new mongoose.Schema(schema, options);
