var baucis   = require("baucis");
var mongoose = require("mongoose");
var titleCase = require("title-case");

module.exports = function attachModel (definition, name) {
    var options = {
        collection: name.plural,
        id: false,
        safe: true,
        strict: "throw",
        versionKey: false
    };
    var schema = new mongoose.Schema(definition, options);
    var model = mongoose.model(name.singular, schema);
    model.plural(name.plural);
    var controller = baucis.rest(model);
    controller.versions("1.0.0");
    controller.methods("put delete", false);
    controller.generateSwagger2();
    delete controller.swagger2.paths["/" + name.plural + "/{id}"].delete;
    delete controller.swagger2.paths["/" + name.plural + "/{id}"].put;
    delete controller.swagger2.paths["/" + name.plural].delete;
    delete controller.swagger2.paths["/" + name.plural].put;
    delete controller.swagger2.definitions[titleCase(name.singular)].properties._id;
    delete controller.swagger2.definitions[titleCase(name.singular)].properties.DataCreazione;
};
