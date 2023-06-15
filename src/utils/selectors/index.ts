import {
  DefaultThemeColorsProps,
  ThemeColorsProps,
  PrimaryColorType,
  SOmit,
} from '../../core';

export const colorSelector = (
  color?: SOmit<PrimaryColorType>,
  colors?: ThemeColorsProps,
): string => {
  return colors?.[color as keyof DefaultThemeColorsProps] || (color as string);
};
