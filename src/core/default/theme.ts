import {PrimaryColors} from './colors';
import type {ThemeProps} from '../types';

const DefaultTheme: ThemeProps = {
  DefaultTheme: {
    colors: {
      text: '#000000',
      flat: '#ECF0F1',
      border: '#DDDDDD',
      surface: '#FFFFFE',
      disabled: '#E0E0DB',
      background: '#F7F9F9',
      secondText: '#626567',
      ...PrimaryColors,
    },
  },
  DarkTheme: {
    colors: {
      text: '#ffffff',
      flat: '#282828',
      border: '#565656',
      surface: '#181818',
      disabled: '#3E3E3E',
      secondText: '#B3B3B3',
      background: '#121212',
      ...PrimaryColors,
    },
  },
};

export default DefaultTheme;
