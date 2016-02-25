var AWS = require('aws-sdk');
var q = require('q');

exports.qSetAclForKey = function(key, acl) {
    return q.Promise(function(resolve, reject) {
        var s3 = new AWS.S3();
        s3.putObjectAcl({
            Bucket: 'ascribe0',
            Key: key,
            ACL: acl
        }, function(err, data) {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
