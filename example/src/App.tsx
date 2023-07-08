import * as React from 'react';
import {FastBaseProvider} from 'react-native-fast-base';

const theme = 'dark';

export default function App() {
  return (
    <FastBaseProvider mode={theme}>
      <></>
    </FastBaseProvider>
  );
}
