var path = require('path');
var unit = require('unit');
var http = require('http');

function HttpError(status, message) {
    Error.apply(this.arguments);
    Error.captureStackTrace(this, HttpError);
    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

unit.inherits(HttpError, Error);
HttpError.prototype.name = "HttpError";
exports.HttpError = HttpError;
