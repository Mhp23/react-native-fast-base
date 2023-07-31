import * as React from 'react';
import {
  Button,
  useTheme,
  Container,
  extendTheme,
  FastBaseProvider,
} from '@fast-base/native';

const theme = 'light';

type MyThemeProps = {
  button: {
    style: object;
  };
  colors: {
    royal: string;
  };
  //...
};

const MyTheme = extendTheme<MyThemeProps>({
  DefaultTheme: {
    button: {
      style: {
        backgroundColor: 'green',
      },
    },
    colors: {
      //override default color
      background: '#f9f9f9',
      //or extend
      royal: 'white',
      ///...
    },
  },
  DarkTheme: {
    button: {
      style: {
        backgroundColor: 'orange',
      },
    },
    colors: {
      //override default color
      background: '#222222',
      //or extend
      royal: 'black',
      ///...
    },
  },
});

const MyComponent: React.FC = () => {
  const {colors, button} = useTheme<MyThemeProps>();

  return (
    <Container background={colors.background} p={10}>
      <Button
        title="Press Me!"
        style={button.style}
        titleColor={colors.royal}
      />
    </Container>
  );
};

export default function App() {
  return (
    <FastBaseProvider theme={MyTheme} mode={theme}>
      <MyComponent />
    </FastBaseProvider>
  );
}
