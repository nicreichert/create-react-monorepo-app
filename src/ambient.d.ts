declare module 'replace' {
  function replace(param: {
    regex: string;
    replacement: string;
    paths: [string];
    recursive: boolean;
    silent: boolean;
  }): Promise<void>;

  export = replace;
}
