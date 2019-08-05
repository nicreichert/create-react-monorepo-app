'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = async (workspace, targetDir, name) => {
  const webPath = path.join(targetDir, 'packages', name);
  await fs.copy(path.join(__dirname, 'template'), webPath).then(() => {
    const pkgPath = path.join(webPath, 'package.json');
    const pkg = require(pkgPath);
    pkg.name = `@${workspace}/${name}`;

    return fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  });
};
