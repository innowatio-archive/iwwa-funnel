var baucis            = require("baucis");
var cors              = require("cors");
var express           = require("express");
var mongoose          = require("mongoose");
var winston           = require("winston");
var expressWinston    = require("express-winston");
var R                 = require("ramda");
require("winston-cloudwatch");

var auth = require("./lib/auth-middleware.js");

var config = {
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/iwwa-funnel",
    PASSWORD: process.env.PASSWORD || "PASSWORD",
    PORT: 8012,
    USERNAME: process.env.USERNAME || "USER",
    LOG_FILE: process.env.LOG_FILE || "./logs/iwwa-funnel.log",
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    LOG_GROUP_NAME: process.env.LOG_GROUP_NAME,
    LOG_GROUP_STREAM: process.env.LOG_GROUP_STREAM
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

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new (winston.transports.File)({
            filename: config.LOG_FILE,
            json: false,
            level: config.LOG_LEVEL
        }),
        (config.LOG_GROUP_NAME && config.LOG_GROUP_STREAM) && new winston.transports.CloudWatch({
            level: config.LOG_LEVEL,
            logGroupName: config.LOG_GROUP_NAME,
            logStreamName: config.LOG_GROUP_STREAM
        })
    ].filter(R.identity)
});

// Start express application
express()
    .use(cors())
    .use(auth(config.USERNAME, config.PASSWORD))
    .use(expressWinston.logger({
        winstonInstance: logger
    }))
    .use("/swagger/", express.static("node_modules/swagger-ui/dist/"))
    .use("/api/", api)
    .listen(config.PORT, function () {
        winston.info("Server listening on port " + config.PORT);
    });
