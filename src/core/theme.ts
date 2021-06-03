import {ThemeProps} from './types';

const Theme: ThemeProps = {
  DefaultTheme: {
    darkmode: false,
    colors: {
      background: '#ECF0F1',
      secondText: '#626567',
      surface: '#E5E7E9',
      flat: '#F2F3F4',
      text: '#000000',
    },
  },
  DarkTheme: {
    darkmode: true,
    colors: {
      background: '#121212',
      secondText: '#B3B3B3',
      surface: '#181818',
      flat: '#282828',
      text: '#FFFFFF',
    },
  },
};

export default Theme;
