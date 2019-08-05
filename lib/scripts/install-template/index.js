'use strict';
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var Package_1 = require("../../plugins/Package");
exports.installTemplate = function (targetDir) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var pkg;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pkg = new Package_1.Package(targetDir);
                // add script to package.json
                pkg.addScript({
                    'install-template': 'node scripts/install-template',
                });
                // add dependencies to package.json
                pkg.addDevDependency({
                    'fs-extra': '^8.1.0',
                    inquirer: '^6.5.0',
                    execa: '^2.0.3',
                    'validate-npm-package-name': '^3.0.0',
                    ora: '^3.4.0',
                    chalk: '^2.4.2',
                    replace: '^1.1.0',
                });
                return [4 /*yield*/, pkg.save()];
            case 1:
                _a.sent();
                return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, '../../plugins/'), path_1.default.join(targetDir, 'scripts/install-template'))];
            case 2:
                _a.sent();
                return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, 'script/install-template.js'), path_1.default.join(targetDir, 'scripts/install-template/index.js'))];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
