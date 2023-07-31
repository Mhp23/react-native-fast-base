import React from 'react';
import ProgressBar from '..';
import MockedProvider from '../../../helpers/MockedProvider';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

describe('ProgressBar component', () => {
  it('should render correctly', () => {
    const rendered = render(
      <MockedProvider>
        <ProgressBar width={100} value={0} />
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
