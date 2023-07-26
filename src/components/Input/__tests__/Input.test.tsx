import React from 'react';
import MockedProvider from '../../../helpers/MockedProvider';
import {render, cleanup} from '@testing-library/react-native';
import OutlineInput from '../Outline';
import UnderlineInput from '../Underline';

afterEach(cleanup);

describe('Input components', () => {
  it('should render outline correctly', () => {
    const rendered = render(
      <MockedProvider>
        <OutlineInput />
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render underline correctly', () => {
    const rendered = render(
      <MockedProvider>
        <UnderlineInput />
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
