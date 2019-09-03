"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.sortObject = function (obj) {
    if (!obj) {
        return obj;
    }
    var keys = Object.keys(obj);
    keys.sort();
    return keys.reduce(function (acc, key) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({}, acc), (_a = {}, _a[key] = obj[key], _a)));
    }, {});
};
