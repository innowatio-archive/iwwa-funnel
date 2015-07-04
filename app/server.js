var baucis         = require("baucis");
var cors           = require("cors");
var express        = require("express");
var expressWinston = require("express-winston");
var mongoose       = require("mongoose");
var R              = require("ramda");
var winston        = require("winston");
/*
*   Requiring `winston-cloudwatch` attaches the `CloudWatch` constructor to
*   `winston.transports`
*/
require("winston-cloudwatch");

var auth = require("./lib/auth-middleware.js");

var config = {
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/iwwa-funnel",
    PASSWORD: process.env.PASSWORD || "PASSWORD",
    PORT: process.env.PORT || 8012,
    USERNAME: process.env.USERNAME || "USERNAME",
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    AWS_CLOUDWATCH_LOG_GROUP_NAME: process.env.AWS_CLOUDWATCH_LOG_GROUP_NAME,
    ENABLE_AWS_CLOUDWATCH: process.env.ENABLE_AWS_CLOUDWATCH,
    AWS_CLOUDWATCH_LOG_STREAM_NAME: process.env.AWS_CLOUDWATCH_LOG_STREAM_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION
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
        config.ENABLE_AWS_CLOUDWATCH && new winston.transports.CloudWatch({
            level: config.LOG_LEVEL,
            logGroupName: config.AWS_CLOUDWATCH_LOG_GROUP_NAME,
            logStreamName: config.AWS_CLOUDWATCH_LOG_STREAM_NAME,
            awsAccessKeyId: config.AWS_ACCESS_KEY_ID,
            awsSecretKey: config.AWS_SECRET_KEY,
            awsRegion: config.AWS_REGION
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
