var express = require('express');
var router = express.Router({ mergeParams: true });
const imageProvider = require('../services/image.provider');
var multer = require('multer')
var upload = multer({ limits: { fileSize: 5000000 } });

router.get('/:imageId', function (req, res, next) {
  if (req.session["image" + req.params.imageContext])
    res.type("jpeg") && res.end(new Buffer(req.session["image" + req.params.imageContext].buffer));
  else
    imageProvider.get(req.params.imageId, req.params.imageContext)
      .then(result => res.type("jpeg") && res.send(result.content))
      .catch(next);
});

router.post('/', upload.single('image'), function (req, res, next) {
    req.session['image' + req.params.imageContext] = req.file;
    res.json({ name: 'image' + req.params.imageContext});
});

module.exports = router;
