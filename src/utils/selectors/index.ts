import {SOmit, Colors, ColorsProps, PrimaryColorType} from '../../core';

export const colorSelector = (color?: SOmit<PrimaryColorType>): string => {
  if (!color) {
    return undefined;
  }
  const regex = new RegExp(/[a-z]-[0-9]{2,3}$/);
  if (regex.test(color as string)) {
    const [colorKey, colorNumber] = color.split('-');
    const selectedColor = Colors[colorKey as keyof typeof Colors];
    if (typeof selectedColor === 'object') {
      return selectedColor[colorNumber as unknown as keyof ColorsProps];
    } else {
      return undefined;
    }
  } else {
    return color as string;
  }
};
