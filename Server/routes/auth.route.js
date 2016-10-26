var express = require('express');
var router = express.Router();
//const userProvider = require('../services/user.provider');

/* GET home page. */
router.get('/', function (req, res, next) {
	if(req.body.email && req.body.email.indexOf('@') > -1)
		res.sendStatus(200);
	else
		res.sendStatus(401);
//    userProvider.get()
//			.then(result => res.json(result))
//			.catch(next);
});

module.exports = router;
