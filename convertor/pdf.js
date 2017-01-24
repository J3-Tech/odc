"use strict"

var PDFImage = require("pdf-image").PDFImage;

const AbstractConvertor = require('./abstract.js');

class PdfConvertor extends AbstractConvertor {

    convert() {
        var that = this;
        var pdfImage = new PDFImage(this._document);
        var images = [];
        pdfImage.numberOfPages().then(function(numberOfPages){
            for (var i = 0; i < numberOfPages; i++) {
                pdfImage.convertPage(i).then(function (imagePath) {
                    images.push(imagePath);
                    if(i===numberOfPages){
                        that.emit('pdf.convert.img', images);
                    }
                });
            }
        });
    }

}

module.exports = PdfConvertor;
