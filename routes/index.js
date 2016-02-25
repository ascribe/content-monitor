var pgctrl = require('../ctrls/pgctrl.js');

exports.displayLastWorks = function(req, res, next) {
    pgctrl.qListPieces()
        .then(function(pieces) {
            res.render('index', {
                pieces: pieces
            });
        })
        .catch(function(err) {
            res.send(400, err);
        });
};
