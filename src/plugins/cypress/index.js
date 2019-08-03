'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = async ({ adminType }, name, targetDir) => {
  const cypressPath = path.join(targetDir, 'packages/cypress');
  await fs.copy(path.join(__dirname, 'template'), cypressPath).then(() => {
    const pkg = require(path.join(cypressPath, 'package.json'));

    pkg.scripts = {
      start: `(cd ../web && yarn build) ${
        adminType ? '&& (cd ../admin && yarn build)' : ''
      } && concurrently "PORT=1234 serve -s ../web/build" ${
        adminType ? '"PORT=1235 serve -s ../admin/build"' : ''
      } "cypress open"`,
    };

    return fs.writeFile(path.join(cypressPath, 'package.json'), JSON.stringify(pkg, null, 2));
  });
};
