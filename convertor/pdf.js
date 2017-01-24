"use strict"

var PDFImage = require("pdf-image").PDFImage;

const AbstractConvertor = require('./abstract.js');

class PdfConvertor extends AbstractConvertor {

    convert() {
        var pdfImage = new PDFImage(this._document);
        pdfImage.numberOfPages().then(function(numberOfPages){
            for (var i = 0; i < numberOfPages; i++) {
                pdfImage.convertPage(i).then(function (imagePath) {

                });
            }
        });
        this.emit('pdf.convert.img');
    }

}

module.exports = PdfConvertor;
