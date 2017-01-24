"use strict"

const EventEmitter = require('events');

class AbstractConvertor extends EventEmitter {

    constructor() {
        if (new.target === AbstractConvertor) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        super();
    }

    set document(document) {
        this._document = document;
    }
}

module.exports = AbstractConvertor;
