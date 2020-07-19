'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Lock = /** @class */ (function () {
    function Lock() {
        this.connectors = {};
        this.options = {};
    }
    Lock.prototype.addConnector = function (connector) {
        this.connectors[connector.key] = connector.connector;
        this.options[connector.key] = connector.options;
    };
    Lock.prototype.getConnector = function (key) {
        var options = this.options[key];
        return new this.connectors[key](options);
    };
    return Lock;
}());

exports.Lock = Lock;
