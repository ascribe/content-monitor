var pgctrl = require('../ctrls/pgctrl.js');
var awsctrl = require('../ctrls/awsctrl.js');

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

exports.editKeyAcl = function(req, res, next) {
    var key = req.body.key;
    var acl = req.body.acl;
    awsctrl.qSetAclForKey(key, acl)
        .then(function() {
            console.log('Changed ACL to ' + acl);
            res.redirect('/');
        })
        .catch(function(err) {
            res.send(400, err);
        });
};
