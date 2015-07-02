var bearerToken = require("express-bearer-token");
var R           = require("ramda");

var ACCESS_TOKEN = process.env.ACCESS_TOKEN || "ACCESS_TOKEN";

module.exports = R.always(function authenticate (req, res, next) {
    bearerToken(req, res, function () {
        if (req.token === ACCESS_TOKEN) {
            return next();
        }
        res.status(401).send("Unauthorized");
    });
});
