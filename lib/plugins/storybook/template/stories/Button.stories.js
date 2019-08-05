import { Button } from '@monorepo/ui';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

storiesOf('Button', module)
  .add('Button with label', () => <Button onClick={action('clicked')} label="A Button Test" />)
  .add('Button with children', () => (
    <Button width="20%" onClick={action('clicked')} label="A Button Test">
      <img
        style={{ height: '80%' }}
        src="https://cdn3.iconfinder.com/data/icons/inficons-set-2/512/thumb-up-512.png"
        alt=""
      />
    </Button>
  ));
