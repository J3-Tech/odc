var express = require('express');
var router = express.Router();
const Convertor = require('./../convertor');
const Finder = require('./../finder');
var glob = require("glob")
const pug = require('pug');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/upload', function(req, res) {
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var convertor = new Convertor();
    convertor.registerEvent().process(req.files.document);
    convertor.on('converted.img', () => {
        var images = [];
        var finder = new Finder();
        const compiledFunction = pug.compileFile('views/images.pug');
        finder.get(convertor.timestamp +'/*.jpg', function(images){
            console.log(images);
            res.json({
                type: 'jpg',
                response: compiledFunction({
                    images: images.map(function(image){
                        return image.replace('public/', '/');
                    })
                })
            });
        });
    });
});

module.exports = router;
