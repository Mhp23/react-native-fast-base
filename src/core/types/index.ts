import {ReactNode} from 'react';
import type {
  ViewStyle,
  StyleProp,
  ViewProps,
  TextStyle,
  FlexAlignType,
  PressableProps,
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
export type PropsWithChildren<P = unknown> = P & {
  children?: React.ReactNode | undefined;
};
export type MappedType = {
  [key: string]: any;
};
export type ThemeModeType = 'light' | 'dark';
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
export type DefaultThemeColorsProps = {
  [key in PrimaryColorType]: string;
} & {
  flat: string;
  text: string;
  surface: string;
  secondText: string;
  background: string;
};
export interface DefaultThemeContentProps {
  mode?: ThemeModeType;
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
    changeTheme: (mode: ThemeModeType) => Promise<void>;
  };

export type ThemeProviderProps<T extends MappedType = {}> =
  DefaultThemeContentProps & {
    theme?: ThemeProps<T>;
    /**
     * status bar color
     * @android only
     * @default {colors.background}
     */
    barBackground?: string;
    /**
     * change the phone's bottom navigation bar color depending on the current theme
     * @android only
     * @default false
     */
    useNavigationBarColor?: boolean;
    /**
     * at default, if your phone's dark mode was enabled, the theme will change to dark mode.
     * You are able to set this property as false to avoid enabling system mode and the theme
     * will be handled manually.
     * @default true
     */
    enableSystemMode?: boolean;
  };

export interface SpaceXYProps extends ViewProps, PropsWithChildren {
  spaceX?: number;
  spaceY?: number;
  spaceTop?: number;
  spaceEnd?: number;
  spaceStart?: number;
  spaceBottom?: number;
}
export interface WrapperProps extends SpaceXYProps {
  alignX?: FlexAlignType;
  alignY?: FlexAlignYType;
  alignSelf?: 'auto' | FlexAlignType;
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
}
export type ContainerProps = PropsWithChildren<
  ViewProps & Partial<Pick<DefaultThemeColorsProps, 'background'>>
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
  color?: string;
  /**
   * font of family of the component, you capable of to use your type as generic
   * in the text component.
   */
  font?: T;
}
export interface DividerProps
  extends Pick<SpaceXYProps, 'spaceY' | 'spaceX' | 'spaceTop' | 'spaceBottom'> {
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
  color?: string;

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
