export type ProjectType = 'next' | 'gatsby' | 'cra';

export interface Configuration {
  type: ProjectType;
  adminType: ProjectType | null;
  includeStorybook: boolean;
  includee2e: boolean;
  includeTemplates: boolean;
}

export interface PackageJSON extends Object {
  name: string;
  scripts?: ScriptsMap;
  dependencies?: DependencyMap;
  devDependencies?: DependencyMap;
}

export interface DependencyMap {
  [dependencyName: string]: string;
}

export interface ScriptsMap {
  [scriptName: string]: string;
}
