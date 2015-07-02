var mongoose = require("mongoose");

var schema = {
    Codice: String,
    Descrizione: String,
    UM: String,
    Frequenza: String,
    Tipo: String,
    TipoValore: String,
    Cumulata: Boolean,
    DataCreazione: Date
};

var options = {
    strict: "throw"
};

module.exports = new mongoose.Schema(schema, options);
