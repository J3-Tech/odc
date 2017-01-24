var express = require('express');
var router = express.Router();
const Convertor = require('./../convertor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Document Convertor' });
});

router.post('/upload', function(req, res) {
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var convertor = new Convertor();
    convertor.registerEvent().process(req.files.document);
});

module.exports = router;
