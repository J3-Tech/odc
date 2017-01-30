"use strict";

var fs = require('fs');
const EventEmitter = require('events');
const path = require('path');
var glob = require("glob")
var sanitize = require("sanitize-filename");
var slug = require("slug");

const OfficeConvertor = require('./convertor/office');
const PdfConvertor = require('./convertor/pdf');

class Convertor extends EventEmitter
{
    constructor() {
        super();
        this.timestamp = Date.now();
        this.uploadDir = 'public/documents/' + this.timestamp;
    }

    process(document, format) {
        var that = this;
        fs.mkdirSync(this.uploadDir);
        this.document = this.uploadDir + '/' + sanitize(document.name);
        this.format = format;
        document.mv(this.document, function(err){
            if(!err){
                var ext = path.extname(that.document);
                var newPath = that.uploadDir + '/' + slug(document.name.replace(ext, '')) + ext;
                fs.renameSync(that.document, newPath);
                that.document = newPath;
                that.emit('document.saved');
            }
        });
    }

    convert() {
        var that = this;
        var convertor = null;
        switch (path.extname(this.document)) {
            case '.pdf':
                convertor = new PdfConvertor();
                convertor.format = this.format;
                convertor.on('pdf.convert.img', () => {
                    if(that.deletePdf===true){
                        fs.unlinkSync(this.document);
                    }
                    that.emit('converted.img');
                });
                break;
            default:
                convertor = new OfficeConvertor();
                convertor.on('doc.convert.pdf', (document) => {
                    that.deletePdf = true;
                    that.document = document;
                    that.convert();
                });
                break;
        }
        convertor.document = this.document;
        convertor.convert();
    }

    registerEvent() {
        var that = this;
        this.on('document.saved', () => {
            that.convert();
        });

        return this;
    }
}

module.exports = Convertor;
