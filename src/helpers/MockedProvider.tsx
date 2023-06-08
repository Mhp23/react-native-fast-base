import React from 'react';
import {DefaultTheme, ThemeContext, type ThemeContextProps} from '../core';

const MockedProvider: React.FC = ({children}) => {
  return (
    <ThemeContext.Provider
      value={{
        ...({} as ThemeContextProps),
        ...DefaultTheme.DefaultTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default MockedProvider;
