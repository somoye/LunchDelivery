var express = require('express');
var router = express.Router();
const orderProvider = require('../services/order.provider');

router.get('/', function (req, res, next) {
	orderProvider.get(req.user.id)
		.then(result => res.json(result))
		.catch(next);
});

router.post('/', function (req, res, next) {
	orderProvider.add(req.user.id, req.body.dishId)
		.then(result => res.json(result))
		.catch(next);
});

module.exports = router;
