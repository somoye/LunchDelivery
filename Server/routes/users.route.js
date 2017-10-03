var express = require('express');
var router = express.Router();
const userProvider = require('../services/user.provider');

router.get('/', function (req, res, next) {
	userProvider.get(req.params.userId)
	  .then(result => res.json(result))
	  .catch(next);
  });
  
  router.post('/', function (req, res, next) {
	userProvider.add(Object.assign(req.body, { userId: req.params.userId || req.body.userId }))
	  .then(result => res.json(result))
	  .catch(next);
  });
  
  router.put('/:dishId', function (req, res, next) {
	userProvider.update(
	  Object.assign(req.body, {
		id: req.params.dishId,
		userId: req.params.userId || req.body.userId
	  })
	)
	  .then(result => res.json(result))
	  .catch(next);
  });
   
  router.delete('/:dishId', function (req, res, next) {
	userProvider.delete(req.params.dishId)
	  .then(result => res.json(result))
	  .catch(next);
  });
  





/*router.param('userId',
	function (req, res, next) {
		req.params.userId = req.params.userId == 'me' ? req.user.id : req.params.userId;
		next();
	});

/* GET user info. */
/*router.get('/:userId', function (req, res, next) {
	res.json(req.user);
});

router.use('/:userId/orders', require('./orders.route'));*/

module.exports = router;