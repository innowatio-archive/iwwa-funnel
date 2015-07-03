var auth = require("basic-auth");

module.exports = function (username, password) {
    return function (req, res, next) {
        var user = auth(req);
        if (
            user &&
            user.name === username &&
            user.pass === password
        ) {
            return next();
        }
        res.setHeader("WWW-Authenticate", "Basic realm=\"api\"");
        res.status(401).send("Unauthorized");
    };
};
