import React from 'react';
import type {
  PropsWithChildren,
  ThemeContextProps,
  ThemeContentProps,
  ThemeProviderProps,
} from '../types';
import Colors from '../default/colors';
import extendTheme from './extendTheme';
import {
  Appearance,
  ColorSchemeName,
  NativeEventSubscription,
} from 'react-native';

export const ThemeContext = React.createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);

const defaultProps: ThemeProviderProps = {
  theme: extendTheme(),
  enableSystemMode: true,
};

const FastBaseProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = ({
  mode,
  theme,
  children,
  enableSystemMode,
}) => {
  /**
   * processing the current theme of the app that depends on the passed mode and system mode.
   */
  const getCurrentTheme = React.useCallback(
    (newMode: ColorSchemeName = mode, skipAppearanceCheck = false) => {
      let currentMode = newMode;

      if (!skipAppearanceCheck) {
        const colorScheme = Appearance.getColorScheme();

        if (!currentMode && enableSystemMode && !!colorScheme) {
          currentMode = colorScheme;
        }
      }
      return {
        ...(currentMode === 'dark' ? theme.DarkTheme : theme.DefaultTheme),
        mode: currentMode,
      };
    },
    [enableSystemMode, mode, theme],
  );

  const [currentTheme, setCurrentTheme] =
    React.useState<ThemeContentProps>(getCurrentTheme);

  const changeMode = React.useCallback(
    async function (
      newMode: ColorSchemeName,
      changeModeCallback?: (newMode: ColorSchemeName) => void | Promise<void>,
    ) {
      setCurrentTheme(getCurrentTheme(newMode, true));
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
      setCurrentTheme(getCurrentTheme(colorScheme, true));
    },
    [getCurrentTheme],
  );

  const themeContextValue: ThemeContextProps = React.useMemo(() => {
    return {
      ...currentTheme,
      defaultColors: Colors,
      changeMode,
    };
  }, [currentTheme, changeMode]);

  React.useEffect(() => {
    setCurrentTheme(getCurrentTheme(mode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, theme]);

  React.useEffect(() => {
    let unSubscribe: NativeEventSubscription;
    if (!mode && enableSystemMode) {
      unSubscribe = Appearance.addChangeListener(onColorSchemeChange);
    }
    return () => {
      if (!mode && enableSystemMode) {
        /**
         * handling Appearance listener removing cleanup for different react native versions.
         */
        if (unSubscribe) {
          unSubscribe.remove();
        } else {
          //@ts-expect-error removeChangeListener in Appearance only availible old versions of RN
          Appearance.removeChangeListener(onColorSchemeChange);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSystemMode, mode]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

FastBaseProvider.defaultProps = defaultProps;

export default FastBaseProvider;
