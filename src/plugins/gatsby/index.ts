import fs from 'fs-extra';
import path from 'path';
import { Package } from '../Package';

export const gatsby = async (workspace: string, targetDir: string, name: string) => {
  const p = path.join(targetDir, 'packages', name);
  await fs
    .copy(path.join(__dirname, 'template'), p)
    .then(() => {
      const pkg = new Package(p);
      pkg.setName(`@${workspace}/${name}`);
      return pkg.save();
    })
    .then(() => {
      const pkg = new Package(targetDir);

      pkg.addScript({
        [`start:${name}`]: `concurrently "yarn workspace ${`@${workspace}/${name}`} start" "yarn workspace @${workspace}/ui start"`,
        [`build:${name}`]: `yarn workspace ${`@${workspace}/${name}`} build`,
      });

      return pkg.save();
    });
};
