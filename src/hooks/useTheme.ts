import React from 'react';
import {ThemeContentProps} from '../core/types';
import {ThemePrefrencesContext} from '../core/provider';

const useTheme = (): ThemeContentProps => {
  const {theme} = React.useContext(ThemePrefrencesContext);
  return theme || {};
};

export default useTheme;
