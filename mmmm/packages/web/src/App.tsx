import { Button } from '@mmmm/ui';
import * as React from 'react';

const App: React.FC = () => {
  return (
    <div>
      Hello, World!
      <Button label="Press Me!" onClick={() => console.log('I was pressed!')} />
    </div>
  );
};

export default App;
