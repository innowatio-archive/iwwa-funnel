var mongoose = require("mongoose");

var schema = {
    ID: String,
    ID_Parent: String,
    Descrizione: String,
    CodiceAzienda: String,
    Azienda: String,
    DataCreazione: Date
};

var options = {
    strict: "throw"
};

module.exports = new mongoose.Schema(schema, options);
