"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readme = function (name, storybook, adminType, e2e) { return "# " + name + "\n\n## Scripts\n\n- " + '`yarn test`' + " - Run unit tests in watch mode.\n- " + '`yarn build:ui`' + " - Build UI project, so that other projects can import the new components.\n- " + '`yarn build:web`' + " - Build web project to be deployed.\n- " + '`yarn start:web`' + " - Run web and UI projects on watch mode. All changes to UI will trigger reload on web.\n" + (adminType
    ? "- " + '`yarn build:admin`' + " - Build admin project to be deployed\n- " + '`yarn start:admin`' + " - Run admin and UI projects on watch mode. All changes to UI will trigger reload on admin.\n"
    : '') + (storybook
    ? "- " + '`yarn build:storybook`' + " - Build storybook project to be deployed\n- " + '`yarn start:storybook`' + " - Run storybook and UI projects on watch mode. All changes to UI will trigger reload on storybook.\n"
    : '') + (e2e ? "- " + '`yarn start:cypress`' + " - Run e2e tests with cypress." : '') + "\n"; };
