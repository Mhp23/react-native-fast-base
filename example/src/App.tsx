import * as React from 'react';
import ImageExample from './ImageExample';
import {FastBaseProvider} from 'react-native-fast-base';

const theme = 'dark';

export default function App() {
  return (
    <FastBaseProvider mode={theme}>
      <ImageExample />
    </FastBaseProvider>
  );
}
