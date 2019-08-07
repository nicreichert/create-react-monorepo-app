"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer_1 = require("inquirer");
exports.configuration = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var type, adminType, includeMobile, includeStorybook, includee2e, includeTemplates;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.prompt({
                    name: 'type',
                    type: 'list',
                    message: 'Which starter project you want to use?',
                    choices: [
                        { name: 'create-react-app', value: 'cra' },
                        { name: 'next.js', value: 'next' },
                        { name: 'gatsby', value: 'gatsby' },
                    ],
                })];
            case 1:
                type = (_a.sent()).type;
                return [4 /*yield*/, inquirer_1.prompt({
                        name: 'adminType',
                        type: 'list',
                        message: 'Does your project include an admin panel?',
                        choices: [
                            { name: 'No', value: null },
                            { name: 'Yes (create-react-app)', value: 'cra' },
                            { name: 'Yes (next.js)', value: 'next' },
                            { name: 'Yes (gatsby)', value: 'gatsby' },
                        ],
                    })];
            case 2:
                adminType = (_a.sent()).adminType;
                return [4 /*yield*/, inquirer_1.prompt({
                        name: 'includeMobile',
                        type: 'list',
                        message: 'Does your project include an app? (Will create react-native app)',
                        choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
                    })];
            case 3:
                includeMobile = (_a.sent()).includeMobile;
                return [4 /*yield*/, inquirer_1.prompt({
                        name: 'includeStorybook',
                        type: 'list',
                        message: 'Include Storybook setup?',
                        choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
                    })];
            case 4:
                includeStorybook = (_a.sent()).includeStorybook;
                return [4 /*yield*/, inquirer_1.prompt({
                        name: 'includee2e',
                        type: 'list',
                        message: 'Include E2E tests setup?',
                        choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
                    })];
            case 5:
                includee2e = (_a.sent()).includee2e;
                return [4 /*yield*/, inquirer_1.prompt({
                        name: 'includeTemplates',
                        type: 'list',
                        message: 'Copy templates so you can later create new projects?',
                        choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
                    })];
            case 6:
                includeTemplates = (_a.sent()).includeTemplates;
                return [2 /*return*/, {
                        type: type,
                        adminType: adminType,
                        includeMobile: includeMobile,
                        includeStorybook: includeStorybook,
                        includee2e: includee2e,
                        includeTemplates: includeTemplates,
                    }];
        }
    });
}); };
