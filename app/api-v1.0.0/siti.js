var attachModel = require("../lib/attach-model.js");

var definition = {
    ID: {type: String, required: true},
    ID_Parent: String,
    Descrizione: String,
    CodiceAzienda: {type: String, required: true},
    Azienda: {type: String, required: true},
    DataCreazione: Date
};

var name = {
    plural: "siti",
    singular: "sito"
};

attachModel(definition, name);
