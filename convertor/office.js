"use strict"

var unoconv = require('unoconv');
var fs = require('fs');
const path = require('path');

const AbstractConvertor = require('./abstract.js');

class OfficeConvertor extends AbstractConvertor {

    convert() {
        var that = this;
        unoconv.convert(this._document, 'pdf', function (err, result) {
            if(!err){
                var re = new RegExp(path.extname(that._document) + '$', "g");
                var pdfFile = that._document.replace(re, '.pdf');
                fs.writeFile(pdfFile, result);
                that.emit('doc.convert.pdf', pdfFile);
            }
        });
    }

}

module.exports = OfficeConvertor;
