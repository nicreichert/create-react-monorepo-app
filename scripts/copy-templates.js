'use strict';

const fs = require('fs-extra');
const path = require('path');

// copy plugins to folders
const plugins = ['base', 'cra', 'cypress', 'gatsby', 'next', 'react-native', 'storybook'];

plugins.forEach(plugin => {
  fs.copy(
    path.join(process.cwd(), 'src/plugins', plugin, 'template'),
    path.join(process.cwd(), 'lib/plugins', plugin, 'template')
  );
});

// copy scripts to folders
fs.copy(
  path.join(process.cwd(), 'src/scripts/install-template/script'),
  path.join(process.cwd(), 'lib/scripts/install-template/script')
);
