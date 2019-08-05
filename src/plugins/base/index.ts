import fs from 'fs-extra';
import path from 'path';
import { Configuration } from '../../types';
import { Package } from '../Package';
import { readme } from './readme';

export const base = async (
  { includeStorybook, adminType, includee2e }: Configuration,
  name: string,
  targetDir: string
) => {
  await fs
    .copy(path.join(process.cwd(), 'templates/base'), targetDir)
    .then(() => {
      const pkg = new Package(targetDir);

      pkg.setName(name);
      pkg.addScript({
        postinstall: 'yarn build:ui',
      });
      return pkg.save();
    })
    .then(() =>
      fs.writeFile(
        path.join(targetDir, 'README.md'),
        readme(name, includeStorybook, adminType, includee2e)
      )
    );
};
