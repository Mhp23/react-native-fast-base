import React from 'react';
import Image from '..';
import MockedProvider from '../../../helpers/MockedProvider';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

const IMAGE = 'https://www.stockvault.net/data/2011/05/31/124348/thumb16.jpg';

describe('Image component', () => {
  it('should render correctly', () => {
    const rendered = render(
      <MockedProvider>
        <Image source={{uri: IMAGE}} />
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
