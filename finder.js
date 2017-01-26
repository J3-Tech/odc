"use strict";

const EventEmitter = require('events');
var glob = require("glob")

class Finder extends EventEmitter
{
    get(pattern, callback) {
        var output = [];
        var images = glob.sync('public/documents/'+ pattern);
        var re = new RegExp(/-(\d+)\.[a-z]{3}$/);
        for (var i = 0; i < images.length; i++) {
            var index = parseInt(images[i].match(re).slice(1));
            output[index] = images[i];
        }

        if(callback){
            callback(output);
        }

        return output;
    }

    compress() {

    }

}

module.exports = Finder;
