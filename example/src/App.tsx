import * as React from 'react';
import {Container, FastBaseProvider} from '@fast-base/native';

const theme = 'dark';

export default function App() {
  return (
    <FastBaseProvider dir="ltr" mode={theme}>
      <Container>
        <></>
      </Container>
    </FastBaseProvider>
  );
}
