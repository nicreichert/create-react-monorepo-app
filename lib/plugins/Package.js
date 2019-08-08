"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var sort_object_1 = require("./sort-object");
var Package = /** @class */ (function () {
    function Package(targetDir) {
        var _this = this;
        this.setName = function (name) {
            _this.pkg.name = name;
        };
        this.addDependency = function (dependency) {
            _this.pkg.dependencies = tslib_1.__assign({}, _this.pkg.dependencies, dependency);
        };
        this.addDevDependency = function (dependency) {
            _this.pkg.devDependencies = tslib_1.__assign({}, _this.pkg.devDependencies, dependency);
        };
        this.addScript = function (script) {
            _this.pkg.scripts = tslib_1.__assign({}, _this.pkg.scripts, script);
        };
        this.addNoHoist = function (path) {
            _this.pkg.workspaces.nohoist.push(path);
        };
        this.save = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pkg.devDependencies = sort_object_1.sortObject(this.pkg.devDependencies);
                        this.pkg.dependencies = sort_object_1.sortObject(this.pkg.dependencies);
                        return [4 /*yield*/, fs_extra_1.default.writeFile(path_1.default.join(this.targetDir, 'package.json'), JSON.stringify(this.pkg, null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.targetDir = targetDir;
        this.pkg = require(path_1.default.join(targetDir, 'package.json'));
    }
    return Package;
}());
exports.Package = Package;
