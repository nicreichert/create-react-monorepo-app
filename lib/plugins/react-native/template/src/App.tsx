import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  padding: 100px 20px 0;
  height: 100%;
`;

const Button = styled(TouchableOpacity)`
  flex: 1;

  background-color: white;
  border-width: 1px;
  border-color: black;
  height: 50px;
  padding: 0 20px;

  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled(Text)`
  color: black;
`;

const App = () => {
  return (
    <ScrollView>
      <Wrapper>
        <Button onPress={() => null}>
          <ButtonLabel>A Test Button</ButtonLabel>
        </Button>
      </Wrapper>
    </ScrollView>
  );
};

export default App;
