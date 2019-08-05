"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var Package_1 = require("../Package");
exports.gatsby = function (workspace, targetDir, name) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var p;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                p = path_1.default.join(targetDir, 'packages', name);
                return [4 /*yield*/, fs_extra_1.default
                        .copy(path_1.default.join(process.cwd(), 'templates/gatsby'), p)
                        .then(function () {
                        var pkg = new Package_1.Package(p);
                        pkg.setName("@" + workspace + "/" + name);
                        return pkg.save();
                    })
                        .then(function () {
                        var _a;
                        var pkg = new Package_1.Package(targetDir);
                        pkg.addScript((_a = {},
                            _a["start:" + name] = "concurrently \"(cd packages/" + name + " && yarn start)\" \"(cd packages/ui && yarn start)\"",
                            _a["build:" + name] = "(cd packages/" + name + " && yarn build)",
                            _a));
                        return pkg.save();
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
