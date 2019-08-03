import { addDecorator, configure, setAddon } from '@storybook/react';
import * as React from 'react';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <React.Fragment>
    <div style={{ padding: 50, width: '100%' }}>{story()}</div>
  </React.Fragment>
));

configure(loadStories, module);
