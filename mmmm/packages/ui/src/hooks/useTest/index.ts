import * as React from 'react';

export const useTest = () => {
  const [state, setState] = React.useState(0);

  return [state, setState];
};
