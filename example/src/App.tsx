import * as React from 'react';
import {Container, FastBaseProvider} from 'react-native-fast-base';

const theme = 'dark';

export default function App() {
  return (
    <FastBaseProvider mode={theme}>
      <Container>
        <></>
      </Container>
    </FastBaseProvider>
  );
}
