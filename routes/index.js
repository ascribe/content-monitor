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

    // super stupid security check, never trust your client
    if(acl !== 'private' && acl !== 'public-read' || key.indexOf('digitalwork') < 0) {
        res.send(400, 'Don\t be evil');
    }

    awsctrl.qSetAclForKey(key, acl)
        .then(function() {
            console.log('Changed ACL to ' + acl);
            res.redirect('/');
        })
        .catch(function(err) {
            res.send(400, err);
        });
};


exports.editUser = function(req, res, next) {
    var email = req.body.email;
    var active = req.body.active;

    if(active === 'true') {
        active = true;
    } else if(active === 'false') {
        active = false;
    } else {
        res.send(400, new Error('Don\'t be evil'));
    }

    pgctrl.qSetActiveForUser(email, active)
        .then(function(data) {
            console.log(data);
            console.log('Changed User.is_active to ' + active);
            res.redirect('/');
        })
        .catch(function(err) {
            res.send(400, err);
        });
};
