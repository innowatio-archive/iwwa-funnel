var baucis   = require("baucis");
var cors     = require("cors");
var express  = require("express");
var mongoose = require("mongoose");

var auth = require("./lib/auth-middleware.js");

var config = {
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/iwwa-funnel",
    PASSWORD: process.env.PASSWORD || "PASSWORD",
    PORT: 8012,
    USERNAME: process.env.USERNAME || "USER"
};

// Use baucis decorators
require("baucis-swagger2");
require("./lib/decorator.js");

// Use API version 1.0.0
require("./api-v1.0.0/");

/*
*   Must come _after_ using decorators and apis, otherwise the object is empty.
*   Prime example of how using side-effects is a terrible design decision.
*/
var api = baucis();
api.releases("1.0.0");

// Establish mongoose connection
mongoose.connect(config.MONGO_URL);

// Start express application
express()
    .use(cors())
    .use(auth(config.USERNAME, config.PASSWORD))
    .use("/swagger/", express.static("node_modules/swagger-ui/dist/"))
    .use("/api/", api)
    .listen(config.PORT, function () {
        console.log("Server listening on port " + config.PORT);
    });
