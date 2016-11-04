var express = require('express');
var router = express.Router();
// const orderProvider = require('../services/menu.provider');

router.post('/', function (req, res, next) {
	if(req.user)
		res.sendStatus(200);
	else
		res.sendStatus(403);
});

module.exports = router;
