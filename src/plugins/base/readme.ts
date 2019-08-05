export const readme = (
  name: string,
  storybook: boolean,
  adminType: string | null,
  e2e: boolean
) => `# ${name}

## Scripts

- ${'`yarn test`'} - Run unit tests in watch mode.
- ${'`yarn build:ui`'} - Build UI project, so that other projects can import the new components.
- ${'`yarn build:web`'} - Build web project to be deployed.
- ${'`yarn start:web`'} - Run web and UI projects on watch mode. All changes to UI will trigger reload on web.
${
  adminType
    ? `- ${'`yarn build:admin`'} - Build admin project to be deployed
- ${'`yarn start:admin`'} - Run admin and UI projects on watch mode. All changes to UI will trigger reload on admin.
`
    : ''
}${
  storybook
    ? `- ${'`yarn build:storybook`'} - Build storybook project to be deployed
- ${'`yarn start:storybook`'} - Run storybook and UI projects on watch mode. All changes to UI will trigger reload on storybook.
`
    : ''
}${e2e ? `- ${'`yarn start:cypress`'} - Run e2e tests with cypress.` : ''}
`;
