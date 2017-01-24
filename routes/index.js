var express = require('express');
var router = express.Router();
const Convertor = require('./../convertor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/output/:timestamp', function(req, res, next){
    console.log(req.params.timestamp);
    res.render('output');
});

router.post('/upload', function(req, res) {
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var convertor = new Convertor();
    convertor.registerEvent().process(req.files.document);
    convertor.on('converted.img', (images) => {
        console.log(images);
        res.render('output', { title: 'Document Convertor', images: images })
    });
});

module.exports = router;
