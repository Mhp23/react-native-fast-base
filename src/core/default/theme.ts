import type {ThemeProps} from '../types';
import {
  Black,
  Blue,
  Gray,
  Green,
  Neutral,
  Slate,
  White,
  Zinc,
  Red,
  Emerald,
  Orange,
} from './colors';

const DefaultTheme: ThemeProps = {
  DefaultTheme: {
    colors: {
      text: Black,
      flat: Gray[200],
      error: Red[500],
      disabled: Gray[100],
      warning: Orange[500],
      success: Emerald[500],
      primary: Blue[500],
      background: Gray[50],
      surface: Neutral[50],
      secondary: Green[500],
      secondText: Slate[500],
    },
  },
  DarkTheme: {
    colors: {
      text: White,
      flat: Gray[200],
      error: Red[200],
      disabled: Gray[500],
      warning: Orange[200],
      success: Emerald[200],
      primary: Blue[500],
      surface: Zinc[900],
      secondary: Green[500],
      secondText: Slate[300],
      background: Neutral[900],
    },
  },
};

export default DefaultTheme;
