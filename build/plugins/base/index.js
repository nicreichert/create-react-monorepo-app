"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var Package_1 = require("../Package");
var readme_1 = require("./readme");
exports.base = function (_a, name, targetDir) {
    var includeStorybook = _a.includeStorybook, adminType = _a.adminType, includee2e = _a.includee2e;
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default
                        .copy(path_1.default.join(process.cwd(), 'templates/base'), targetDir)
                        .then(function () {
                        var pkg = new Package_1.Package(targetDir);
                        pkg.setName(name);
                        pkg.addScript({
                            postinstall: 'yarn build:ui',
                        });
                        return pkg.save();
                    })
                        .then(function () {
                        return fs_extra_1.default.writeFile(path_1.default.join(targetDir, 'README.md'), readme_1.readme(name, includeStorybook, adminType, includee2e));
                    })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
