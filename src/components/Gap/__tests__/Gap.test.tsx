import React from 'react';
import Gap from '..';
import Text from '../../../components/Text';
import MockedProvider from '../../../helpers/MockedProvider';
import {render, cleanup} from '@testing-library/react-native';

afterEach(cleanup);

describe('Gap component', () => {
  it('should render correctly when behavior is the divider', () => {
    const rendered = render(
      <MockedProvider>
        <Gap behavior="divider" space="md">
          <Text>Hello World</Text>
          <Text size="lg">Hello World</Text>
          <Text size="xl">Hello World</Text>
        </Gap>
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render correctly when behavior is the style', () => {
    const rendered = render(
      <MockedProvider>
        <Gap behavior="style" space="md">
          <Text>Hello World</Text>
          <Text size="lg">Hello World</Text>
          <Text size="xl">Hello World</Text>
        </Gap>
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });

  it('should render the fragment parented components correctly', () => {
    const rendered = render(
      <MockedProvider>
        <Gap space="md">
          <React.Fragment>
            <Text>Hello World</Text>
          </React.Fragment>
          <Text size="xl">Hello World</Text>
          <>
            <Text size="lg">Hello World</Text>
          </>
        </Gap>
      </MockedProvider>,
    );
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
