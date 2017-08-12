var express = require('express');
var router = express.Router();
const userProvider = require('../services/user.provider');

router.param('userId',
	function (req, res, next) {
		req.params.userId = req.params.userId == 'me' ? req.user.id : req.params.userId;
		next();
	});

/* GET user info. */
router.get('/:userId', function (req, res, next) {
	res.json(req.user);
});

router.use('/:userId/orders', require('./orders.route'));

module.exports = router;