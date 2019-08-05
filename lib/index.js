"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var execa_1 = tslib_1.__importDefault(require("execa"));
var ora_1 = tslib_1.__importDefault(require("ora"));
var path_1 = tslib_1.__importDefault(require("path"));
// @ts-ignore
var replace_1 = tslib_1.__importDefault(require("replace"));
var configuration_1 = require("./configuration");
var base_1 = require("./plugins/base");
var cra_1 = require("./plugins/cra");
var cypress_1 = require("./plugins/cypress");
var gatsby_1 = require("./plugins/gatsby");
var next_1 = require("./plugins/next");
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
        var config, type, adminType, includeStorybook, includee2e, includeTemplates, targetDir, _a, _b, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, configuration_1.configuration()];
                case 1:
                    config = _e.sent();
                    type = config.type, adminType = config.adminType, includeStorybook = config.includeStorybook, includee2e = config.includee2e, includeTemplates = config.includeTemplates;
                    // run the generator
                    spinner.start('Generating project');
                    targetDir = path_1.default.resolve(name);
                    // Copy base template
                    return [4 /*yield*/, base_1.base(config, name, targetDir)];
                case 2:
                    // Copy base template
                    _e.sent();
                    // Copy web template
                    return [4 /*yield*/, webCreator(type)(name, targetDir, 'web')];
                case 3:
                    // Copy web template
                    _e.sent();
                    // Copy admin template
                    _a = adminType;
                    if (!_a) 
                    // Copy admin template
                    return [3 /*break*/, 5];
                    return [4 /*yield*/, webCreator(adminType)(name, targetDir, 'admin')];
                case 4:
                    _a = (_e.sent());
                    _e.label = 5;
                case 5:
                    // Copy admin template
                    _a;
                    // Copy storybook template
                    _b = includeStorybook;
                    if (!_b) 
                    // Copy storybook template
                    return [3 /*break*/, 7];
                    return [4 /*yield*/, storybook_1.storybook(name, targetDir)];
                case 6:
                    _b = (_e.sent());
                    _e.label = 7;
                case 7:
                    // Copy storybook template
                    _b;
                    _c = includee2e;
                    if (!_c) return [3 /*break*/, 9];
                    return [4 /*yield*/, cypress_1.cypress(name, targetDir)];
                case 8:
                    _c = (_e.sent());
                    _e.label = 9;
                case 9:
                    _c;
                    _d = includeTemplates;
                    if (!_d) return [3 /*break*/, 11];
                    return [4 /*yield*/, install_template_1.installTemplate(targetDir)];
                case 10:
                    _d = (_e.sent());
                    _e.label = 11;
                case 11:
                    _d;
                    // Replace `@monorepo` with current project name from templates
                    replace_1.default({
                        regex: '@monorepo',
                        replacement: "@" + name,
                        paths: [targetDir],
                        recursive: true,
                        silent: true,
                    });
                    spinner.succeed("Project generated at " + chalk_1.default.blue(targetDir));
                    // install dependencies
                    spinner.start('Installing dependencies');
                    return [4 /*yield*/, execa_1.default('yarn', ['install'], { cwd: targetDir })];
                case 12:
                    _e.sent();
                    spinner.succeed('Dependencies installed');
                    // intialize git
                    spinner.start('Initializing git');
                    return [4 /*yield*/, execa_1.default('git', ['init'], { cwd: targetDir })];
                case 13:
                    _e.sent();
                    return [4 /*yield*/, execa_1.default('git', ['add', '-A'], { cwd: targetDir })];
                case 14:
                    _e.sent();
                    return [4 /*yield*/, execa_1.default('git', ['commit', '-m', 'Initial commit'], {
                            cwd: targetDir,
                        })];
                case 15:
                    _e.sent();
                    return [4 /*yield*/, execa_1.default('node', ['node_modules/husky/husky.js', 'install'], {
                            cwd: targetDir,
                        })];
                case 16:
                    _e.sent();
                    spinner.succeed(chalk_1.default.blue('git') + " initialized");
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
