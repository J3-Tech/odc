"use strict"

var PDFImage = require("pdf-image").PDFImage;

const AbstractConvertor = require('./abstract.js');

class PdfConvertor extends AbstractConvertor {

    set format(format) {
        this._format = format;
    }

    convert() {
        var that = this;
        var pdfImage = new PDFImage(this._document);
        pdfImage.setConvertExtension(this._format);
        pdfImage.setConvertOptions({
            '-quality': '100'
        });
        pdfImage.numberOfPages(function(){}).then(function(numberOfPages){
            for (var i = 0; i < numberOfPages; i++) {
                pdfImage.convertPage(i).then(function (imagePath) {
                    if(i===parseInt(numberOfPages)){
                        that.emit('pdf.convert.img');
                    }
                });
            }
        });

        return this;
    }

}

module.exports = PdfConvertor;
