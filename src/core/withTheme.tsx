import React from 'react';
import {useTheme} from '../hooks';
import {ThemeProps, ThemeContentProps} from './types';

const withTheme = (
  Component: any,
  CustomTheme: ThemeProps | undefined = undefined,
) => {
  return (props: any) => {
    const defaultTheme = useTheme();

    let theme: ThemeContentProps | undefined = defaultTheme;

    if (CustomTheme) {
      if (defaultTheme?.darkmode) {
        theme = CustomTheme?.DarkTheme;
      }

      theme = CustomTheme?.DefaultTheme;
    }

    return <Component theme={theme} {...props} />;
  };
};

export default withTheme;
