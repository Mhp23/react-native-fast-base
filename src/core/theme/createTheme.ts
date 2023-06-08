import type {ThemeProps} from '../types';
import DefaulFastBaseTheme from '../default/theme';
import deepmerge from 'deepmerge';

const createTheme = <T extends object = {}>(
  customTheme: ThemeProps<T>,
): ThemeProps<T> => {
  return deepmerge<ThemeProps<T>>(
    DefaulFastBaseTheme as ThemeProps<T>,
    customTheme,
  );
};

export default createTheme;
