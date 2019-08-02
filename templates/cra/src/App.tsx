import { Button } from '@monorepo/ui';
import * as React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Button onClick={() => null} m={['0', '0 1rem']} label="a test button">
          Test!
        </Button>
      </header>
    </div>
  );
};

export default App;
