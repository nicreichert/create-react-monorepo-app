# create-react-monorepo-app 🛸

This project is a highly opinionated boilerplate for react monorepos, built using [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

Out of the box, it includes:

- [typescript](https://www.typescriptlang.org)
- [eslint](https://eslint.org)
- [prettier](https://prettier.io)
- [stylelint](https://stylelint.io/user-guide/cli)
- [jest](https://jestjs.io)
- [husky](https://github.com/typicode/husky)

You can also choose to include:

- [storybook](https://storybook.js.org/)
- [cypress](https://www.cypress.io/)

And, for your web projects, you can choose between:

- [create-react-app](https://github.com/facebook/create-react-app)
- [next.js](https://nextjs.org/)
- [gatsby](https://www.gatsbyjs.org)

## How to use

To create your monorepo project, simply run:

```shell
npx create-react-monorepo-app my-app
```

The configuration wizzard will allow you to choose what your project should include.

## Configurations

As part of setup process, you can include in your project:

- admin project (in case your project requires one)
- storybook
- cypress

Note that both `storybook` and `cypress` are using minimal setup, therefore, they don't have support for `typescript` out of the box. However, that doesn't mean it can't be done.

## Next steps

- [x] Add [gatsby](https://www.gatsbyjs.org/) template
- [x] Add possibility to export the templates together (to create new projects)
- [x] Port to typescript
