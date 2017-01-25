"use strict"

var PDFImage = require("pdf-image").PDFImage;

const AbstractConvertor = require('./abstract.js');

class PdfConvertor extends AbstractConvertor {

    set extension(extension) {
        this._extension = extension;
    }

    convert() {
        this.process('png')
            .process('jpg')
            .process('bmp')
        ;
    }

    process(extension) {
        var that = this;
        var pdfImage = new PDFImage(this._document);
        pdfImage.setConvertExtension(extension);
        pdfImage.numberOfPages().then(function(numberOfPages){
            for (var i = 0; i < numberOfPages; i++) {
                pdfImage.convertPage(i).then(function (imagePath) {
                    if(i==numberOfPages){
                        that.emit('pdf.convert.img');
                    }
                });
            }
        });

        return this;
    }

}

module.exports = PdfConvertor;
