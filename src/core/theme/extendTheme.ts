import type {MappedType, ThemeProps} from '../types';
import DefaulFastBaseTheme from '../default/theme';
import deepmerge from 'deepmerge';

const extendTheme = <T extends MappedType = {}>(
  customTheme: ThemeProps<T> = {},
): ThemeProps<T> => {
  return deepmerge<ThemeProps<T>>(
    DefaulFastBaseTheme as ThemeProps<T>,
    customTheme,
  );
};

export default extendTheme;
