'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = async (name, targetDir) => {
  const storybookPath = path.join(targetDir, '/packages/storybook');
  await fs.copy(path.join(__dirname, 'template'), storybookPath);
};
