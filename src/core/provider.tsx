import React from 'react';
import Theme from './theme';
import {ProviderProps, ThemeContentProps} from './types';
import {useColorScheme} from 'react-native';

const ThemePrefrencesContext = React.createContext({theme: Theme.DefaultTheme});

const {Provider} = ThemePrefrencesContext;

const ThemeProvider: React.FC<ProviderProps> = ({
  children,
  theme,
  darkMode = false,
  ignorePhoneMode = false,
}) => {
  const isSchemaDark = useColorScheme() === 'dark';

  const currentTheme: ThemeContentProps | undefined = React.useMemo(() => {
    return theme
      ? (!ignorePhoneMode && isSchemaDark) || darkMode
        ? theme?.DarkTheme
        : theme?.DefaultTheme
      : (!ignorePhoneMode && isSchemaDark) || darkMode
      ? Theme?.DarkTheme
      : Theme?.DefaultTheme;
  }, [darkMode, isSchemaDark, theme, ignorePhoneMode]);

  const mergedTheme: ThemeContentProps = {
    ...currentTheme,
    darkMode,
  };

  return <Provider value={{theme: mergedTheme}}>{children}</Provider>;
};

export {ThemeProvider, ThemePrefrencesContext};
