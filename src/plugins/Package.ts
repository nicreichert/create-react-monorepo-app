import fs from 'fs-extra';
import path from 'path';
import { DependencyMap, PackageJSON, ScriptsMap } from '../types';
import { sortObject } from './sort-object';

export class Package {
  private targetDir: string;
  private pkg: PackageJSON;

  public constructor(targetDir: string) {
    this.targetDir = targetDir;
    this.pkg = require(path.join(targetDir, 'package.json')) as PackageJSON;
  }

  public setName = (name: string) => {
    this.pkg.name = name;
  };

  public addDependency = (dependency: DependencyMap) => {
    this.pkg.dependencies = {
      ...this.pkg.dependencies,
      ...dependency,
    };
  };

  public addDevDependency = (dependency: DependencyMap) => {
    this.pkg.devDependencies = {
      ...this.pkg.devDependencies,
      ...dependency,
    };
  };

  public addScript = (script: ScriptsMap) => {
    this.pkg.scripts = {
      ...this.pkg.scripts,
      ...script,
    };
  };

  public addNoHoist = (path: string) => {
    this.pkg.workspaces.nohoist.push(path);
  };

  public save = async () => {
    this.pkg.devDependencies = sortObject(this.pkg.devDependencies);
    this.pkg.dependencies = sortObject(this.pkg.dependencies);

    await fs.writeFile(
      path.join(this.targetDir, 'package.json'),
      JSON.stringify(this.pkg, null, 2)
    );
  };
}
