import React from 'react';
import {MappedType, ThemeContext, ThemeContextProps} from '../core';

const useTheme = <T extends MappedType = {}>() => {
  const theme = React.useContext<ThemeContextProps<T>>(ThemeContext as any);
  return theme;
};

export default useTheme;
