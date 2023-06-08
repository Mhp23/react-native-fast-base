import React from 'react';
import type {
  MappedType,
  ThemeModeType,
  PropsWithChildren,
  ThemeContextProps,
  ThemeContentProps,
  ThemeProviderProps,
} from '../types';
import DefaultTheme from '../default/theme';
import {Appearance, StatusBar, Platform} from 'react-native';

export const ThemeContext = React.createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);

const ThemeProvider = <T extends MappedType = {}>({
  mode,
  theme,
  children,
  barBackground,
  enableSystemMode,
  useNavigationBarColor,
}: PropsWithChildren<ThemeProviderProps<T>>): JSX.Element => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeContentProps<T>>(
    () => {
      const defaultTheme = typeof theme === 'object' ? theme : DefaultTheme;
      return (
        mode === 'dark' ? defaultTheme.DarkTheme : defaultTheme.DefaultTheme
      ) as ThemeContentProps<T>;
    },
  );
  const onColorSchemeChange = React.useCallback(
    ({colorScheme}: {colorScheme: ThemeModeType}) => {
      if (enableSystemMode) {
        /**
         * first check device android is version >= 29 or ios version >= 13 for these platform
         */
        const android10Support =
          Platform.OS === 'android' && Platform.Version >= 29;
        const ios13Support =
          Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13;

        if (android10Support || ios13Support) {
          setCurrentTheme(
            colorScheme === 'dark' ? theme.DarkTheme : theme.DefaultTheme,
          );
        }
      }
    },
    [enableSystemMode, theme],
  );
  const changeTheme = React.useCallback(
    async (newMode: ThemeModeType) => {
      const newTheme =
        newMode === 'dark' ? theme.DarkTheme : theme.DefaultTheme;

      const barBackgroundColor = barBackground || newTheme?.colors.background;

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(barBackgroundColor);

        if (useNavigationBarColor) {
          //To Do: change navigatio bar color
        }
      }
      StatusBar.setBarStyle(
        newMode === 'dark' ? 'light-content' : 'dark-content',
      );
      setCurrentTheme(newTheme);
    },
    [theme, barBackground, useNavigationBarColor],
  );
  const themeContextValue: ThemeContextProps<T> = React.useMemo(() => {
    return {
      ...currentTheme,
      changeTheme,
    };
  }, [currentTheme, changeTheme]);

  React.useEffect(() => {
    const appearance = Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      /**
       * handling Appearance listener removing cleanup for different react native versions.
       */
      if ('removeChangeListener' in Appearance) {
        (Appearance as any).removeChangeListener(onColorSchemeChange);
      } else if (appearance) {
        appearance.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
