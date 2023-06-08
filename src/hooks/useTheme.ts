import React from 'react';
import {ThemeContext} from '../core';

const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  return theme;
};

export default useTheme;
