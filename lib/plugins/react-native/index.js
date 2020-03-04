"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var replace_1 = tslib_1.__importDefault(require("replace"));
var Package_1 = require("../Package");
var capitalise = function (str) { return "" + str[0].toUpperCase() + str.substr(1); };
var renameDirs = function (dir, newName) {
    var files = fs_extra_1.default.readdirSync(dir);
    files.forEach(function (file) {
        if (fs_extra_1.default.statSync(path_1.default.join(dir, file)).isDirectory()) {
            renameDirs(path_1.default.join(dir, file), newName);
        }
        if (file.includes('@mobile')) {
            fs_extra_1.default.rename(path_1.default.join(dir, file), path_1.default.join(dir, file.replace('@mobile', newName)));
        }
    });
};
exports.reactNative = function (workspace, targetDir, name) {
    if (name === void 0) { name = 'mobile'; }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var p, projectName;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = path_1.default.join(targetDir, 'packages', name);
                    projectName = workspace
                        .split('-')
                        .map(capitalise)
                        .reduce(function (acc, s) { return acc + s; }, '');
                    return [4 /*yield*/, fs_extra_1.default
                            .copy(path_1.default.join(__dirname, 'template'), p)
                            .then(function () {
                            return replace_1.default({
                                regex: '@appName',
                                replacement: projectName,
                                paths: [p],
                                recursive: true,
                                silent: true,
                            });
                        })
                            .then(function () { return renameDirs(p, projectName); })
                            .then(function () {
                            var pkg = new Package_1.Package(p);
                            pkg.setName("@" + workspace + "/" + name);
                            return pkg.save();
                        })
                            .then(function () {
                            var _a;
                            var pkg = new Package_1.Package(targetDir);
                            pkg.addScript((_a = {},
                                _a["start:" + name + "-ios"] = "concurrently \"yarn workspace " + ("@" + workspace + "/" + name) + " start\" \"yarn workspace " + ("@" + workspace + "/" + name) + " run-ios\"",
                                _a["start:" + name + "-android"] = "concurrently \"yarn workspace " + ("@" + workspace + "/" + name) + " start\" \"yarn workspace " + ("@" + workspace + "/" + name) + " run-android\"",
                                _a));
                            return pkg.save();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
