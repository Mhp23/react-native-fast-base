import type {ThemeProps} from '../types';
import {PrimaryColors, gray, neutral, slate, zinc} from './colors';

const DefaultTheme: ThemeProps = {
  DefaultTheme: {
    colors: {
      text: '#000000',
      flat: gray[200],
      disabled: gray[300],
      background: gray[50],
      surface: neutral[50],
      secondText: slate[500],
      ...PrimaryColors,
    },
  },
  DarkTheme: {
    colors: {
      text: '#ffffff',
      flat: gray[500],
      surface: zinc[900],
      disabled: gray[400],
      secondText: slate[300],
      background: neutral[900],
      ...PrimaryColors,
    },
  },
};

export default DefaultTheme;
