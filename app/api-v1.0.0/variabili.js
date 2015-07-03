var attachModel = require("../lib/attach-model.js");

var definition = {
    Codice: String,
    Descrizione: String,
    UM: String,
    Frequenza: String,
    Tipo: String,
    TipoValore: String,
    Cumulata: Boolean,
    DataCreazione: Date
};

var name = {
    plural: "variabili",
    singular: "variabile"
};

attachModel(definition, name);
