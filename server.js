require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var routes = require('./routes/index.js');

app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

router.get('/', routes.displayLastWorks);
router.post('/keys', routes.editKeyAcl);
router.post('/users', routes.editUser);

app.use('/', router);

app.listen(port);
console.log('App running on port', port);
