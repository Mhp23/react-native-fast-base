import type {ThemeProps} from '../types';
import {
  blue,
  gray,
  green,
  neutral,
  slate,
  zinc,
  red,
  emerald,
  orange,
} from './colors';

const DefaultTheme: ThemeProps = {
  DefaultTheme: {
    colors: {
      text: '#000000',
      flat: gray[200],
      error: red[500],
      disabled: gray[100],
      warning: orange[500],
      success: emerald[500],
      primary: blue[500],
      background: gray[50],
      surface: neutral[50],
      secondary: green[500],
      secondText: slate[500],
    },
  },
  DarkTheme: {
    colors: {
      text: '#ffffff',
      flat: gray[500],
      error: red[500],
      disabled: gray[500],
      warning: orange[500],
      success: emerald[500],
      primary: blue[500],
      surface: zinc[900],
      secondary: green[500],
      secondText: slate[300],
      background: neutral[900],
    },
  },
};

export default DefaultTheme;
