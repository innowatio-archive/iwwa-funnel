var attachModel = require("../lib/attach-model.js");

var definition = {
    Impianto: String,
    IdVariabile: String,
    Valore: String,
    DataLettura: Date,
    DataInizio: Date,
    DataFine: Date,
    Data: Date,
    DataCreazione: Date
};

var name = {
    plural: "misure",
    singular: "misura"
};

attachModel(definition, name);
