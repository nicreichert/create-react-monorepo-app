import { Button } from '@monorepo/ui';
import * as React from 'react';

const App: React.FC = () => {
  return (
    <div>
      Hello, World!
      <Button onClick={() => null} m={['0', '0 1rem']} label="a test button">
        Test!
      </Button>
    </div>
  );
};

export default App;
