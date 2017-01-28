"use strict"

var PDFImage = require("pdf-image").PDFImage;

const AbstractConvertor = require('./abstract.js');

class PdfConvertor extends AbstractConvertor {

    convert() {
        this.process('jpg');
        this.on('pdf.convert.img.jpg', function(){
            this.process('png');
        });
    }

    process(extension) {
        var that = this;
        var pdfImage = new PDFImage(this._document);
        pdfImage.setConvertExtension(extension);
        pdfImage.setConvertOptions({
            '-quality': '100'
        });
        pdfImage.numberOfPages(function(){}).then(function(numberOfPages){
            for (var i = 0; i < numberOfPages; i++) {
                pdfImage.convertPage(i).then(function (imagePath) {
                    if(i===parseInt(numberOfPages)){
                        that.emit('pdf.convert.img.' + extension);
                    }
                });
            }
        });

        return this;
    }

}

module.exports = PdfConvertor;
