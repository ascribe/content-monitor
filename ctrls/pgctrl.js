var q = require('q');
var pgp = require('pg-promise')({ promiseLib: q });

var _buildConn = function() {
    return {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        ssl: true
    };
};

var _getClient = function() {
    return pgp(_buildConn());
};

exports.qListPieces = function() {
    var db = _getClient();

    // join blobs_digitalwork and piece_piece and get all pieces registered in the last 48 hours
    return db.query('SELECT * FROM piece_piece AS pp JOIN blobs_digitalwork bd ON pp.digital_work_id = bd.id JOIN auth_user AS au ON pp.user_registered_id = au.id WHERE pp.datetime_registered >= now() - interval \'48 hour\'  ORDER BY pp.id DESC')
            .finally(pgp.end);
};

exports.qSetActiveForUser = function(email, isActive) {
    var db = _getClient();

    return db.none({
        name: 'set-active_user',
        text: 'UPDATE "auth_user" SET "is_active"=$1 WHERE email=$2',
        values: [isActive, email]
     })
    .finally(pgp.end);
};
