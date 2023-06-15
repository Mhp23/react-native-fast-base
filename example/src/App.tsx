import * as React from 'react';
import {Container, FastBaseProvider} from 'react-native-fast-base';

export default function App() {
  return (
    <FastBaseProvider mode="dark">
      <Container>
        <></>
      </Container>
    </FastBaseProvider>
  );
}
