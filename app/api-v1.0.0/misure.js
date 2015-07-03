var attachModel = require("../lib/attach-model.js");

var definition = {
    Impianto: {type: String, required: true},
    IdVariabile: {type: String, required: true},
    Valore: {type: String, required: true},
    DataLettura: {type: Date, required: true},
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
