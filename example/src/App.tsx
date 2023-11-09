import * as React from 'react';
import {FastBaseProvider} from '@fast-base/native';
import TweetApp from './TweetApp';

const theme = 'dark';

export default function App() {
  return (
    <FastBaseProvider dir="ltr" mode={theme}>
      <TweetApp />
    </FastBaseProvider>
  );
}
