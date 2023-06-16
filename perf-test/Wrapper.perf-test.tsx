import React from 'react';
import Wrapper from '../src/components/Wrapper';
import {measurePerformance} from 'reassure';

jest.setTimeout(60_000);

test('Performance Wrapper Check', async () => {
  await measurePerformance(<Wrapper />);
});
