import * as React from 'react';
import {
  Divider,
  Wrapper,
  Container,
  FastBaseProvider,
} from 'react-native-fast-base';

export default function App() {
  return (
    <FastBaseProvider mode="dark">
      <Container>
        <Wrapper background="blue-100" p={10} />
        <Divider color="green-100" width={10} />
      </Container>
    </FastBaseProvider>
  );
}
