"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var command_exists_1 = require("command-exists");
var execa_1 = tslib_1.__importDefault(require("execa"));
var ora_1 = tslib_1.__importDefault(require("ora"));
var path_1 = tslib_1.__importDefault(require("path"));
var replace_1 = tslib_1.__importDefault(require("replace"));
var configuration_1 = require("./configuration");
var base_1 = require("./plugins/base");
var cra_1 = require("./plugins/cra");
var cypress_1 = require("./plugins/cypress");
var gatsby_1 = require("./plugins/gatsby");
var next_1 = require("./plugins/next");
var react_native_1 = require("./plugins/react-native");
var storybook_1 = require("./plugins/storybook");
var install_template_1 = require("./scripts/install-template");
var spinner = ora_1.default({
    color: 'red',
});
var webCreator = function (type) {
    switch (type) {
        case 'next':
            return next_1.next;
        case 'gatsby':
            return gatsby_1.gatsby;
        default:
            return cra_1.cra;
    }
};
function create(name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var config, type, adminType, includeMobile, includeStorybook, includee2e, includeTemplates, targetDir, _a, _b, _c, _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, configuration_1.configuration()];
                case 1:
                    config = _f.sent();
                    type = config.type, adminType = config.adminType, includeMobile = config.includeMobile, includeStorybook = config.includeStorybook, includee2e = config.includee2e, includeTemplates = config.includeTemplates;
                    // run the generator
                    spinner.start('Generating project');
                    targetDir = path_1.default.resolve(name);
                    // Copy base template
                    return [4 /*yield*/, base_1.base(config, name, targetDir, includeMobile)];
                case 2:
                    // Copy base template
                    _f.sent();
                    // Copy web template
                    return [4 /*yield*/, webCreator(type)(name, targetDir, 'web')];
                case 3:
                    // Copy web template
                    _f.sent();
                    // Copy admin template
                    _a = adminType;
                    if (!_a) 
                    // Copy admin template
                    return [3 /*break*/, 5];
                    return [4 /*yield*/, webCreator(adminType)(name, targetDir, 'admin')];
                case 4:
                    _a = (_f.sent());
                    _f.label = 5;
                case 5:
                    // Copy admin template
                    _a;
                    // Copy react-native template
                    _b = includeMobile;
                    if (!_b) 
                    // Copy react-native template
                    return [3 /*break*/, 7];
                    return [4 /*yield*/, react_native_1.reactNative(name, targetDir)];
                case 6:
                    _b = (_f.sent());
                    _f.label = 7;
                case 7:
                    // Copy react-native template
                    _b;
                    // Copy storybook template
                    _c = includeStorybook;
                    if (!_c) 
                    // Copy storybook template
                    return [3 /*break*/, 9];
                    return [4 /*yield*/, storybook_1.storybook(name, targetDir)];
                case 8:
                    _c = (_f.sent());
                    _f.label = 9;
                case 9:
                    // Copy storybook template
                    _c;
                    // Copy cypress templatee
                    _d = includee2e;
                    if (!_d) 
                    // Copy cypress templatee
                    return [3 /*break*/, 11];
                    return [4 /*yield*/, cypress_1.cypress(name, targetDir)];
                case 10:
                    _d = (_f.sent());
                    _f.label = 11;
                case 11:
                    // Copy cypress templatee
                    _d;
                    // Replace `@monorepo` with current project name from templates
                    replace_1.default({
                        regex: '@monorepo',
                        replacement: "@" + name,
                        paths: [targetDir],
                        recursive: true,
                        silent: true,
                    });
                    // Copy templates and create script to installing new templates
                    _e = includeTemplates;
                    if (!_e) 
                    // Copy templates and create script to installing new templates
                    return [3 /*break*/, 13];
                    return [4 /*yield*/, install_template_1.installTemplate(targetDir)];
                case 12:
                    _e = (_f.sent());
                    _f.label = 13;
                case 13:
                    // Copy templates and create script to installing new templates
                    _e;
                    spinner.succeed("Project generated at " + chalk_1.default.blue(targetDir));
                    // install dependencies
                    spinner.start('Installing dependencies');
                    return [4 /*yield*/, execa_1.default('yarn', ['install'], { cwd: targetDir })];
                case 14:
                    _f.sent();
                    spinner.succeed('Dependencies installed');
                    // intialize git
                    spinner.start('Initializing git');
                    return [4 /*yield*/, execa_1.default('git', ['init'], { cwd: targetDir })];
                case 15:
                    _f.sent();
                    return [4 /*yield*/, execa_1.default('git', ['add', '-A'], { cwd: targetDir })];
                case 16:
                    _f.sent();
                    return [4 /*yield*/, execa_1.default('git', ['commit', '-m', 'Initial commit'], {
                            cwd: targetDir,
                        })];
                case 17:
                    _f.sent();
                    // Setup husky
                    return [4 /*yield*/, execa_1.default('node', ['node_modules/husky/husky.js', 'install'], {
                            cwd: targetDir,
                        })];
                case 18:
                    // Setup husky
                    _f.sent();
                    spinner.succeed(chalk_1.default.blue('git') + " initialized");
                    if (!command_exists_1.sync('code')) return [3 /*break*/, 20];
                    return [4 /*yield*/, execa_1.default('code', [targetDir])];
                case 19:
                    _f.sent();
                    return [3 /*break*/, 24];
                case 20:
                    if (!command_exists_1.sync('atom')) return [3 /*break*/, 22];
                    return [4 /*yield*/, execa_1.default('atom', [targetDir])];
                case 21:
                    _f.sent();
                    return [3 /*break*/, 24];
                case 22:
                    if (!command_exists_1.sync('subl')) return [3 /*break*/, 24];
                    return [4 /*yield*/, execa_1.default('subl', [targetDir])];
                case 23:
                    _f.sent();
                    _f.label = 24;
                case 24:
                    spinner.succeed(name + " setup concluded");
                    return [2 /*return*/];
            }
        });
    });
}
function createApp(name) {
    create(name).catch(function (error) {
        spinner.fail("Error: " + error.message);
        console.log(error);
    });
}
exports.createApp = createApp;
