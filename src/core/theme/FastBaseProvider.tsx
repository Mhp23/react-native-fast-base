import React from 'react';
import type {
  PropsWithChildren,
  ThemeContextProps,
  ThemeContentProps,
  ThemeProviderProps,
} from '../types';
import Colors from '../default/colors';
import extendTheme from './extendTheme';
import {Appearance, ColorSchemeName} from 'react-native';

export const ThemeContext = React.createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);

const FastBaseProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  enableSystemMode,
  theme = extendTheme(),
}) => {
  const mounted = React.useRef<boolean>(false);
  /**
   * processing the current theme of the app that depends on the passed mode and system mode.
   */
  const getCurrentTheme = React.useCallback(
    (newMode: ColorSchemeName = theme?.mode) => {
      let currentMode = newMode;

      const colorScheme = Appearance.getColorScheme();

      if (!currentMode && enableSystemMode && !!colorScheme) {
        currentMode = colorScheme;
      }
      return {
        ...(currentMode === 'dark' ? theme.DarkTheme : theme.DefaultTheme),
        mode: currentMode,
      };
    },
    [enableSystemMode, theme],
  );

  const [currentTheme, setCurrentTheme] =
    React.useState<ThemeContentProps>(getCurrentTheme);

  const changeMode = React.useCallback(
    async function (
      newMode: ColorSchemeName,
      changeModeCallback?: (newMode: ColorSchemeName) => void | Promise<void>,
    ) {
      const newTheme = getCurrentTheme(newMode);
      setCurrentTheme(newTheme);
      /**
       * executing changeModeCallback function if was passed
       */
      if (changeModeCallback) {
        try {
          await Promise.resolve(changeModeCallback(newMode));
        } catch (error) {
          console.warn(error);
        }
      }
    },
    [getCurrentTheme],
  );

  const onColorSchemeChange = React.useCallback(
    ({colorScheme}: {colorScheme: ColorSchemeName}) => {
      changeMode(colorScheme);
    },
    [changeMode],
  );

  const themeContextValue: ThemeContextProps = React.useMemo(() => {
    return {
      ...currentTheme,
      defaultColors: Colors,
      changeMode,
    };
  }, [currentTheme, changeMode]);

  React.useEffect(() => {
    if (mounted.current) {
      setCurrentTheme(getCurrentTheme(theme.mode));
    }
  }, [theme.mode, getCurrentTheme]);

  React.useEffect(() => {
    mounted.current = true;

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
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default FastBaseProvider;
