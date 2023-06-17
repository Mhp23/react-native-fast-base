import {ReactNode} from 'react';
import Colors from '../default/colors';
import type {
  ViewStyle,
  StyleProp,
  ViewProps,
  TextStyle,
  FlexAlignType,
  PressableProps,
  ColorSchemeName,
  ActivityIndicatorProps,
  TextProps as NativeTextProps,
} from 'react-native';
import {Animated} from 'react-native';

export enum DefaultSizes {
  xs = 2,
  sm = 4,
  md = 8,
  lg = 12,
  xl = 24,
}
export type SOmit<S extends string | number> = S | Omit<string, S>;
export type AllColorsType =
  SOmit<`${keyof typeof Colors}-${keyof ColorsProps}`>;
export type PropsWithChildren<P = unknown> = P & {
  children?: React.ReactNode | undefined;
};
export type MappedType = {
  [key: string]: any;
};
export type SizeType = keyof typeof DefaultSizes;
export type PrimaryColorType =
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'success'
  | 'warning'
  | 'error';
export type TextAlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type FlexAlignYType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type WrapperModePropType =
  | 'normal'
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';
export type IconPropsType =
  | 'AntDesign'
  | 'Entypo'
  | 'MaterialIcons'
  | 'MaterMaterialCommunityIcons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'Ionicons'
  | 'Fontisto'
  | 'Feather'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';
export interface ColorsProps {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}
export type DefaultThemeColorsProps = Partial<
  {
    [key in PrimaryColorType]: string;
  } & {
    flat: string;
    text: string;
    surface: string;
    secondText: string;
    background: string;
  }
>;
export interface DefaultThemeContentProps {
  mode?: ColorSchemeName;
  defaultColors?: typeof Colors;
}
export type ThemeColorsProps<T extends MappedType = {}> =
  DefaultThemeColorsProps & {
    [P in keyof T]: T[P];
  };
export type ThemeContentProps<T extends MappedType = {}> =
  DefaultThemeContentProps & {
    colors?: ThemeColorsProps<T['colors']>;
  } & {
    [P in keyof T]: T[P];
  };
export interface ThemeProps<T extends MappedType = {}> {
  DarkTheme?: ThemeContentProps<T>;
  DefaultTheme?: ThemeContentProps<T>;
}
export type ThemeContextProps<T extends MappedType = {}> =
  ThemeContentProps<T> & {
    changeMode: (
      mode: ColorSchemeName,
      /**
       * you are able to execute your callback function after the theme mode is changed, such as
       * changing the Android navigation bar color, status bar color, etc.
       */
      changeModeCallback?: (newMode: ColorSchemeName) => void | Promise<void>,
    ) => void;
  };

export type ThemeProviderProps<T extends MappedType = {}> = Pick<
  DefaultThemeContentProps,
  'mode'
> & {
  theme?: ThemeProps<T>;
  /**
   * at default, if your phone's dark mode was enabled, the theme will change to dark mode.
   * You are able to set this property as false to avoid enabling system mode and the theme
   * will be handled manually.
   * @default true
   */
  enableSystemMode?: boolean;
};

export interface SpaceXYProps extends ViewProps, PropsWithChildren {
  /**
   * p is equal to padding style
   */
  p?: number;
  /**
   * px is equal to paddingHorizontal style
   */
  px?: number;
  /**
   * py is equal to paddingVertical style
   */
  py?: number;
  /**
   * pt is equal to paddingTop style
   */
  pt?: number;
  /**
   * pb is equal to paddingBottom style
   */
  pb?: number;
  /**
   * pr is equal to paddingRight style
   */
  pr?: number;
  /**
   * pl is equal to paddingLeft style
   */
  pl?: number;
  /**
   * pe is equal to paddingEnd style
   */
  pe?: number;
  /**
   * ps is equal to paddingStart style
   */
  ps?: number;
  /**
   * m is equal to margin style
   */
  m?: number;
  /**
   * mx is equal to marginHorizontal style
   */
  mx?: number;
  /**
   * my is equal to marginVertical style
   */
  my?: number;
  /**
   * mt is equal to marginTom style
   */
  mt?: number;

  /**
   * mb is equal to marginBottom style
   */
  mb?: number;
  /**
   * mr is equal to marginRight style
   */
  mr?: number;
  /**
   * ml is equal to marginLeft style
   */
  ml?: number;
  /**
   * me is equal to marginEnd style
   */
  me?: number;
  /**
   * ms is equal to marginStart style
   */
  ms?: number;
}
export interface WrapperProps extends SpaceXYProps {
  /**
   * the responsive width size using passed width percentage.
   * more info: https://github.com/Mhp23/react-native-full-responsive
   */
  width?: number;
  /**
   * the responsive height size using passed height percentage.
   * more info: https://github.com/Mhp23/react-native-full-responsive
   */
  height?: number;

  alignX?: FlexAlignType;

  alignY?: FlexAlignYType;

  self?: 'auto' | FlexAlignType;
  /**
   * this is a property to specify component flex direction
   */
  mode?: WrapperModePropType;
  /**
   * you are able to set a boolean or number value for this property, if the value of the flex
   * property is 'true', flex will consider '1', and if you passa number,a numeric value will be
   * considered for the flex value.
   */
  flex?: number | boolean;

  background?: AllColorsType;
}
export type ContainerProps = PropsWithChildren<
  ViewProps & Pick<WrapperProps, 'background'> & SpaceXYProps
>;
export interface TextProps<T extends string = ''> extends NativeTextProps {
  alignX?: TextAlignType;
  /**
   * font size of the component
   * @default 14
   */
  size?: number;
  /**
   * text color of the component, you are able to set a custom text color for
   * the text (as default the text color provided in the theme will consider)
   */
  color?: AllColorsType;
  /**
   * font of family of the component, you capable of to use your type as generic
   * in the text component.
   */
  font?: T;
}
export interface DividerProps extends ViewProps {
  /**
   * the direction of dividing two elements
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * dividing mode of two elements
   * @default border
   */
  mode?: 'padding' | 'border';
  /**
   * the border width of the divider, only works when the mode is `border`
   * @default 1
   */
  width?: number;
  /**
   * border color of the component, you are able to set a custom border color for
   * the Divider component (as default flat color provided in the theme will consider),
   * only works when the mode is `border`
   */
  color?: AllColorsType;

  style?: StyleProp<ViewStyle>;
}

export interface ButtonProps extends PressableProps {
  children: string | ReactNode;
  /**
   * button style mode could one of this modes.
   */
  mode: 'solid' | 'outline' | 'transparent';
  /**
   * button size could be one of the size type
   */
  size: SizeType;
  /**
   * enabling activity indicator
   */
  loading: boolean;

  loadingColor: string;
  /**
   * all availible properties in ActivityIndicator component
   */
  loadingProps: ActivityIndicatorProps;

  disabled: boolean;

  title: string;

  color: SOmit<PrimaryColorType>;

  wrapperStyle: StyleProp<ViewStyle>;

  wrapperProps: WrapperProps;

  buttonStyle: StyleProp<ViewStyle>;

  titleStyle: StyleProp<TextStyle>;

  titleColor: string;

  titleProps: TextProps;

  radius: SizeType | number;

  shadow: 'low' | 'medium' | 'high';

  disabledColor: string;

  disabledWrapperStyle: StyleProp<ViewStyle>;

  disabledTitleStyle: StyleProp<ViewStyle>;

  borderColor: string;

  pressable: boolean;

  pressableConfig: UseAnimationConfig;
}
export interface UseAnimationConfig {
  pressIn?: Animated.TimingAnimationConfig;
  pressOut?: Animated.TimingAnimationConfig;
}
