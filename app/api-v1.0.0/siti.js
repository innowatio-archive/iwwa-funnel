var attachModel = require("../lib/attach-model.js");

var definition = {
    ID: String,
    ID_Parent: String,
    Descrizione: String,
    CodiceAzienda: String,
    Azienda: String,
    DataCreazione: Date
};

var name = {
    plural: "siti",
    singular: "sito"
};

attachModel(definition, name);
