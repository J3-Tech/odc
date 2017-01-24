var express = require('express');
const readChunk = require('read-chunk');
const fileType = require('file-type');
var PDFImage = require("pdf-image").PDFImage;
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Document Convertor' });
});

router.post('/upload', function(req, res) {
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var document = req.files.document;
    var dir = 'upload/' + Date.now();
    var documentPath = dir + '/document';
    fs.mkdirSync(dir);
    document.mv(documentPath, function(err){
        if(err){
            console.log('done');
        }else{
            const buffer = readChunk.sync(documentPath, 0, 4100);
            var ext = fileType(buffer).ext;
            newDocumentPath = documentPath + '.' + ext;
            fs.rename(documentPath, newDocumentPath);
            var pdfImage = new PDFImage(newDocumentPath);
            pdfImage.numberOfPages().then(function(numberOfPages){
                for (var i = 0; i < numberOfPages; i++) {
                    pdfImage.convertPage(i).then(function (imagePath) {
                        //console.log(fs.existsSync(documentPath + '-'))
                        //fs.existsSync("/tmp/document-"+ i  +".png")
                    });
                }
            });
        }
    });
});

module.exports = router;
