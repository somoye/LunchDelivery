var express = require('express');
var router = express.Router();
const menuProvider = require('../services/menu.provider');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/menu', function (req, res, next) {
    menuProvider.get()
			.then(result => res.json(result))
			.catch(next);
});

module.exports = router;
