import type {ThemeProps} from '../types';
import {Black, Blue, Gray, Green, Neutral, Slate, White, Zinc} from './colors';

const DefaultTheme: ThemeProps = {
  DarkTheme: {
    colors: {
      text: Black,
      flat: Gray[200],
      primary: Blue[500],
      background: Gray[50],
      surface: Neutral[50],
      secondary: Green[500],
      secondText: Slate[500],
    },
  },
  DefaultTheme: {
    colors: {
      text: White,
      flat: Gray[200],
      primary: Blue[500],
      surface: Zinc[900],
      secondary: Green[500],
      secondText: Slate[300],
      background: Neutral[900],
    },
  },
};

export default DefaultTheme;
