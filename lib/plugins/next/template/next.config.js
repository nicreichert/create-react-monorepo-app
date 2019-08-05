const withTM = require('next-transpile-modules');

module.exports = withTM({
  transpileModules: ['@monorepo/ui'],
});
