var R = require("ramda");

module.exports = R.always(function (req, res) {
    res.status(200).send();
});
