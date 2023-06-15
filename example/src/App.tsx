import * as React from 'react';
import {Container, FastBaseProvider, Text} from 'react-native-fast-base';

export default function App() {
  return (
    <FastBaseProvider mode="dark">
      <Container>
        <Text>Hello World!</Text>
      </Container>
    </FastBaseProvider>
  );
}
