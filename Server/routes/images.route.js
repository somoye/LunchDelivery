var express = require('express');
var router = express.Router({mergeParams: true});
const imageProvider = require('../services/image.provider');
//var multer = require('multer')
//var upload = multer({ limits: { fileSize: 5000000 } });

router.get('/:imageId', function (req, res, next) {
  imageProvider.get(req.params.imageId, req.params.imageContext)
    .then(result => res.type("jpeg") && res.send(result.content))
    .catch(next);
});

module.exports = router;
